import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';

import { createAction } from '@reduxjs/toolkit';

import {
  IUser,
  IUserData,
  TmdbConfiguration,
  TmdbImageBaseUrls,
  TmdbCredits,
  TRootState,
  TmdbMovieSimple,
  TmdbMovieDetailed,
  TmdbGenre,
} from '#state/types';

type TAPIResponse<T> = {
  data: T | null;
  errors: { message: string }[];
};

type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E;
      data?: undefined;
      meta?: M;
    }
  | {
      error?: undefined;
      data: T;
      meta?: M;
    };

type TTypedFetchBaseQueryError<T> = {
  status: number;
  data: T;
};

type TBaseQueryAPIResponse<T> = QueryReturnValue<
  TAPIResponse<T>,
  TTypedFetchBaseQueryError<TAPIResponse<T>>,
  FetchBaseQueryMeta
>;

type TBaseQueryFnResponse<T> = QueryReturnValue<
  T,
  TTypedFetchBaseQueryError<T>,
  FetchBaseQueryMeta
>;

type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;

type TPendingTokenRequest = MaybePromise<
  QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
>;

type TDiscoverMoviesOptions = {
  page?: number;
  with_genres?: string;
  without_genres?: string;
  with_cast?: string;
  with_crew?: string;
  with_people?: string;
  with_keywords?: string;
  without_keywords?: string;
  with_watch_providers?: string;
  with_watch_monetization_types?: 'flatrate' | 'free' | 'ads' | 'rent' | 'buy';
};

// To break the circular dependency between api slice and user slice we define the actions in here instead of
// in the user slice.
// (user slice needs to react to api endpoints, but api needs to dispatch user slice actions)
export const setAccessToken = createAction<string>('user/setAccessToken');
export const setLoggedOut = createAction('user/setLoggedOut');

const baseUrl = import.meta.env.VITE_MOVIE_API_URL as string;

let pendingTokenRequest: TPendingTokenRequest | null = null;

let imageBaseUrls: TmdbImageBaseUrls | undefined;
let genreLookupTable: Record<number, TmdbGenre> | undefined;

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
  let queryResult = (await baseQueryWithAuthHeaders(
    args,
    api,
    extraOptions,
  )) as TBaseQueryAPIResponse<unknown>;

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
    queryResult = (await baseQueryWithAuthHeaders(
      args,
      api,
      extraOptions,
    )) as TBaseQueryAPIResponse<unknown>;
  }

  if (queryResult.data?.data) {
    return {
      data: queryResult.data.data,
      meta: queryResult.meta,
    };
  }

  if (queryResult.error?.data?.errors) {
    return {
      error: {
        error: queryResult.error?.data.errors[0].message,
        status: 'CUSTOM_ERROR',
      } as FetchBaseQueryError,
      meta: queryResult.meta,
    };
  }

  return queryResult;
};

const fetchImageBaseUrlsIfUndefined = async (
  baseQuery: (arg: Parameters<BaseQueryFn>[0]) => ReturnType<BaseQueryFn>,
) => {
  if (!imageBaseUrls) {
    const imageBaseUrlsQueryResponse = (await baseQuery(
      'tmdb/configuration',
    )) as TBaseQueryFnResponse<{ images: TmdbConfiguration }>;

    const config = imageBaseUrlsQueryResponse?.data?.images;

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
    )) as TBaseQueryFnResponse<{
      genres: Array<{ id: number; name: string }>;
    }>;
    const genres = genreLookupTableQueryResponse.data?.genres;

    if (genres) {
      genreLookupTable = genres.reduce(
        (acc: Record<number, TmdbGenre>, genre) => {
          acc[genre.id] = genre;
          return acc;
        },
        {},
      );
    }
  }
};

const isURIEncoded = (str: string) =>
  !str.match('.*[\\ "\\<\\>\\{\\}|\\\\^~\\[\\]].*');

const api = createApi({
  reducerPath: 'moviesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { user: IUser; jwtToken: string },
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `/login?username=${username}&password=${password}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    silentLogin: builder.mutation<{ user: IUser; jwtToken: string }, void>({
      query: () => ({
        url: `/silentrefresh`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    logoutUser: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
    registerUser: builder.mutation<IUser, IUserData>({
      query: (newUserData: IUserData) => ({
        url: '/users',
        method: 'POST',
        credentials: 'include',
        body: newUserData,
      }),
    }),
    updateUser: builder.mutation<
      IUser,
      {
        userId: string;
        newUserData: IUserData;
      }
    >({
      query: ({ userId, newUserData }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        credentials: 'include',
        body: newUserData,
      }),
    }),
    deleteUser: builder.mutation<IUser, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    addMovieToFavorites: builder.mutation<
      IUser,
      { userId: string; movieId: string }
    >({
      query: ({ userId, movieId }) => ({
        url: `/users/${userId}/movies/${movieId}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    removeMovieFromFavorites: builder.mutation<
      IUser,
      { userId: string; movieId: string }
    >({
      query: ({ userId, movieId }) => ({
        url: `/users/${userId}/movies/${movieId}`,
        method: 'DELETE',
        credentials: 'include',
      }),
    }),
    discoverMovies: builder.query<
      {
        movies: Array<TmdbMovieSimple>;
        totalPages: number;
        totalResults: number;
        genreLookupTable: Record<number, TmdbGenre> | undefined;
      },
      TDiscoverMoviesOptions
    >({
      queryFn: async (
        { page = 1, ...restArgs },
        queryApi,
        extraOptions,
        baseQuery,
      ) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);

        const queryArgs: string[] = [];
        Object.entries(restArgs).forEach(([key, value]) => {
          queryArgs.push(`&${key}=${value}`);
        });

        const response = (await baseQuery(
          `tmdb/discover/movie?page=${page}${queryArgs}`,
        )) as TBaseQueryFnResponse<{
          results: Array<TmdbMovieSimple>;
          total_pages: number;
          total_results: number;
        }>;

        if (response.data) {
          const movies = (response.data.results as TmdbMovieSimple[]) || [];
          const moviesWithImagePathsAndGenres = movies.map((movie) => ({
            ...movie,
            id: movie.id.toString(),
            backdropUrl:
              movie.backdrop_path && imageBaseUrls
                ? imageBaseUrls.backdropBaseUrl + movie.backdrop_path
                : '',
            posterUrl:
              movie.poster_path && imageBaseUrls
                ? imageBaseUrls.posterBaseUrl + movie.poster_path
                : '',
            genres: movie.genre_ids.map((genreId) =>
              genreLookupTable
                ? genreLookupTable[genreId]
                : { id: -1, name: '' },
            ),
          }));
          return {
            data: {
              genreLookupTable,
              movies: moviesWithImagePathsAndGenres,
              totalPages: response.data.total_pages,
              totalResults: response.data.total_results,
            },
          };
        }

        return { error: response.error as FetchBaseQueryError };
      },
    }),
    getMovieById: builder.query<TmdbMovieDetailed, string>({
      queryFn: async (movieId, queryApi, extraOptions, baseQuery) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);

        const response = (await baseQuery(
          `tmdb/movie/${movieId}`,
        )) as TBaseQueryFnResponse<TmdbMovieDetailed>;

        if (response.data) {
          const movie = response.data;
          const movieWithImagePaths = {
            ...movie,
            id: movie.id.toString(),
            backdropUrl:
              movie.backdrop_path && imageBaseUrls
                ? imageBaseUrls.backdropBaseUrl + movie.backdrop_path
                : '',
            posterUrl:
              movie.poster_path && imageBaseUrls
                ? imageBaseUrls.posterBaseUrl + movie.poster_path
                : '',
          };
          return { data: movieWithImagePaths };
        }

        return { error: response.error as FetchBaseQueryError };
      },
    }),
    getManyMoviesById: builder.query<TmdbMovieDetailed[], string[]>({
      queryFn: async (movieIds, queryApi, extraOptions, baseQuery) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);

        const movies: TmdbMovieDetailed[] = [];
        const errors: FetchBaseQueryError[] = [];

        // Note that 'map' is deliberately used here to iterate instead of forEach or for...of to
        // allow for parallel execution of queries.
        // Check https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop/37576787#37576787
        // for more details.

        await Promise.all(
          movieIds.map(async (movieId) => {
            const response = (await baseQuery(
              `tmdb/movie/${movieId}`,
            )) as TBaseQueryFnResponse<TmdbMovieDetailed>;

            if (response.data) {
              const movie = response.data;
              const movieWithImagePaths = {
                ...movie,
                id: movie.id.toString(),
                backdropUrl:
                  movie.backdrop_path && imageBaseUrls
                    ? imageBaseUrls.backdropBaseUrl + movie.backdrop_path
                    : '',
                posterUrl:
                  movie.poster_path && imageBaseUrls
                    ? imageBaseUrls.posterBaseUrl + movie.poster_path
                    : '',
              };
              movies.push(movieWithImagePaths);
            }
            errors.push(response.error as FetchBaseQueryError);
          }),
        );

        if (movies.length) {
          return {
            data: movies,
          };
        }

        return { error: errors[0] };
      },
    }),
    searchMovies: builder.query<
      {
        movies: Array<TmdbMovieSimple>;
        totalPages: number;
        totalResults: number;
        genreLookupTable: Record<number, TmdbGenre> | undefined;
      },
      { query: string; page: number }
    >({
      queryFn: async (
        { query = '', page = 1 },
        queryApi,
        extraOptions,
        baseQuery,
      ) => {
        await fetchImageBaseUrlsIfUndefined(baseQuery);
        await fetchGenreLookupTableIfUndefined(baseQuery);
        const encodedQuery = isURIEncoded(query) ? query : encodeURI(query);

        const response = (await baseQuery(
          `tmdb/search/movie?query=${encodedQuery}&page=${page}`,
        )) as TBaseQueryFnResponse<{
          results: Array<TmdbMovieSimple>;
          total_pages: number;
          total_results: number;
          genreLookupTable: Record<number, TmdbGenre>;
        }>;

        if (response.data) {
          const movies = (response.data.results as TmdbMovieSimple[]) || [];
          const moviesWithImagePathsAndGenres = movies.map((movie) => ({
            ...movie,
            id: movie.id.toString(),
            backdropUrl:
              movie.backdrop_path && imageBaseUrls
                ? imageBaseUrls.backdropBaseUrl + movie.backdrop_path
                : '',
            posterUrl:
              movie.poster_path && imageBaseUrls
                ? imageBaseUrls.posterBaseUrl + movie.poster_path
                : '',
            genres: movie.genre_ids.map((genreId) =>
              genreLookupTable
                ? genreLookupTable[genreId]
                : { id: -1, name: '' },
            ),
          }));
          return {
            data: {
              genreLookupTable,
              movies: moviesWithImagePathsAndGenres,
              totalPages: response.data.total_pages,
              totalResults: response.data.total_results,
            },
          };
        }

        return { error: response.error as FetchBaseQueryError };
      },
    }),
    getMovieCreditsById: builder.query<TmdbCredits, string>({
      query: (id) => `tmdb/movie/${id}/credits`,
    }),
  }),
});

export default api;

export const {
  useLoginUserMutation,
  useSilentLoginMutation,
  useLogoutUserMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAddMovieToFavoritesMutation,
  useRemoveMovieFromFavoritesMutation,
  useDiscoverMoviesQuery,
  useGetMovieByIdQuery,
  useGetManyMoviesByIdQuery,
  useSearchMoviesQuery,
  useGetMovieCreditsByIdQuery,
} = api;
