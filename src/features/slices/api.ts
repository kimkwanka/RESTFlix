import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { createAction } from '@reduxjs/toolkit';

import {
  IUser,
  TmdbConfiguration,
  TmdbImageBaseUrls,
  TmdbCredits,
  TRootState,
  TmdbMovieSimple,
  TmdbMovieDetailed,
  TAppDispatch,
} from '@features/types';

type TAPIResponse<T> = {
  data: T;
  errors: { message: string }[];
};

type TBaseQueryResponse<T> = {
  data: TAPIResponse<T>;
  error?: unknown;
  meta?: unknown;
};

// To break the circular dependency between api slice and user slice we define the actions in here instead of
// in the user slice.
// (user slice needs to react to api endpoints, but api needs to dispatch user slice actions)
export const setAccessToken = createAction<string>('user/setAccessToken');
export const setLoggedOut = createAction('user/setLoggedOut');

const baseUrl = import.meta.env.VITE_MOVIE_API_URL as string;

let pendingTokenRequest: ReturnType<TAppDispatch> = null;

let imageBaseUrls: TmdbImageBaseUrls | undefined;
let genreLookupTable: Record<number, string> | undefined;

const baseQueryWithAuthHeaders = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as TRootState).user;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let queryResult = await baseQueryWithAuthHeaders(args, api, extraOptions);

  if (queryResult.error && queryResult.error.status === 401) {
    // If initital request was rejected because of missing or invalid access token,
    // try to get a new token pair from the server if such a request isn't already pending
    if (!pendingTokenRequest) {
      pendingTokenRequest = baseQueryWithAuthHeaders(
        { url: '/silentrefresh', method: 'POST', credentials: 'include' },
        api,
        extraOptions,
      );
    }
    // Wait for the pending token request
    const refreshResult = (await pendingTokenRequest) as TAPIResponse<{
      data: { jwtToken: string };
    }>;

    // Either update the store with the new token if successful or log out otherwise
    if (refreshResult.data) {
      api.dispatch(setAccessToken(refreshResult.data.data.jwtToken));
    } else {
      api.dispatch(setLoggedOut());
    }

    pendingTokenRequest = null;

    // Now that we have a new token, retry the initial request
    queryResult = await baseQueryWithAuthHeaders(args, api, extraOptions);
  }
  return queryResult;
};

const fetchImageBaseUrlsIfUndefined = async (
  baseQuery: (arg: Parameters<BaseQueryFn>[0]) => ReturnType<BaseQueryFn>,
) => {
  if (!imageBaseUrls) {
    const imageBaseUrlsQueryResponse = (await baseQuery(
      'tmdb/configuration',
    )) as TBaseQueryResponse<{ images: TmdbConfiguration }>;

    const config = imageBaseUrlsQueryResponse.data.data.images;

    if (config) {
      imageBaseUrls = {
        posterBaseUrl:
          config.secure_base_url +
          config.poster_sizes[config.poster_sizes.length - 2],
        profileBaseUrl:
          config.secure_base_url +
          config.profile_sizes[config.profile_sizes.length - 2],
        backdropBaseUrl:
          config.secure_base_url +
          config.backdrop_sizes[config.backdrop_sizes.length - 2],
      };
    }
  }
};

const fetchGenreLookupTableIfUndefined = async (
  baseQuery: (arg: Parameters<BaseQueryFn>[0]) => ReturnType<BaseQueryFn>,
) => {
  if (!genreLookupTable) {
    const genreLookupTableQueryResponse = (await baseQuery(
      'tmdb/genre/movie/list',
    )) as TBaseQueryResponse<{
      genres: Array<{ id: number; name: string }>;
    }>;

    const { genres } = genreLookupTableQueryResponse.data.data;

    if (genres) {
      genreLookupTable = genres.reduce((acc: Record<number, string>, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
    }
  }
};

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loginUser: builder.mutation<IUser, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: `/login?username=${username}&password=${password}`,
        method: 'POST',
        credentials: 'include',
      }),
      transformResponse: ({ data }) => {
        return { data: data.user, token: data.jwtToken, isLoggedIn: true };
      },
    }),
    silentLogin: builder.mutation<IUser, void>({
      query: () => ({
        url: `/silentrefresh`,
        method: 'POST',
        credentials: 'include',
      }),
      transformResponse: ({ data }) => {
        return { data: data.user, token: data.jwtToken, isLoggedIn: true };
      },
    }),
    discoverMovies: builder.query<
      { movies: Array<TmdbMovieSimple>; totalPages: number },
      number | void
    >({
      queryFn: async (page = 1, api, extraOptions, baseQuery) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);

        const response = (await baseQuery(
          `tmdb/discover/movie?page=${page}`,
        )) as TBaseQueryResponse<{
          results: Array<TmdbMovieSimple>;
          total_pages: number;
        }>;

        const movies = response.data.data.results as TmdbMovieSimple[];
        const moviesWithImagePathsAndGenres = movies.map((movie) => ({
          ...movie,
          backdropUrl: imageBaseUrls?.backdropBaseUrl + movie.backdrop_path,
          posterUrl: imageBaseUrls?.posterBaseUrl + movie.poster_path,
          genreList: movie.genre_ids.map(
            (genreId) => genreLookupTable?.[genreId] || '',
          ),
        }));

        return response.data
          ? {
              data: {
                movies: moviesWithImagePathsAndGenres,
                totalPages: response.data.data.total_pages,
              },
            }
          : { error: response.error as FetchBaseQueryError };
      },
    }),
    getMovieById: builder.query<TmdbMovieDetailed, string>({
      queryFn: async (id, api, extraOptions, baseQuery) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);

        const response = (await baseQuery(
          `tmdb/movie/${id}`,
        )) as TBaseQueryResponse<TmdbMovieDetailed>;

        const movie = response.data.data;
        const movieWithImagePathsAndGenres = {
          ...movie,
          backdropUrl: imageBaseUrls?.backdropBaseUrl + movie.backdrop_path,
          posterUrl: imageBaseUrls?.posterBaseUrl + movie.poster_path,
          genreList: movie.genres.map(({ name }) => name),
        };
        return response.data
          ? { data: movieWithImagePathsAndGenres }
          : { error: response.error as FetchBaseQueryError };
      },
    }),
    getMovieCreditsById: builder.query<TmdbCredits, string>({
      query: (id) => `tmdb/movie/${id}/credits`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSilentLoginMutation,
  useDiscoverMoviesQuery,
  useGetMovieCreditsByIdQuery,
  useGetMovieByIdQuery,
} = moviesApi;
