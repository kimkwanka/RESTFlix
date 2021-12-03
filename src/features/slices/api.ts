import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { createAction } from '@reduxjs/toolkit';

import {
  TmdbConfiguration,
  TmdbImageBaseUrls,
  TmdbCredits,
  TRootState,
  TmdbMovieSimple,
  TmdbMovieDetailed,
  TAppDispatch,
} from '@features/types';

// To break the circular dependency between api slice and user slice we define the actions in here instead of
// in the user slice.
// (user slice needs to react to api endpoints, but api needs to dispatch user slice actions)
export const setAccessToken = createAction<string>('user/setAccessToken');
export const setLoggedOut = createAction('user/setLoggedOut');

const baseUrl = import.meta.env.VITE_MOVIE_API_URL as string;

type TAPIResponse<T> = {
  data: T;
  errors: { message: string }[];
};

let pendingTokenRequest: ReturnType<TAppDispatch> = null;

const baseQuery = fetchBaseQuery({
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
  let queryResult = await baseQuery(args, api, extraOptions);

  if (queryResult.error && queryResult.error.status === 401) {
    // If initital request was rejected because of missing or invalid access token,
    // try to get a new token pair from the server if such a request isn't already pending
    if (!pendingTokenRequest) {
      pendingTokenRequest = baseQuery(
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
    queryResult = await baseQuery(args, api, extraOptions);
  }
  return queryResult;
};

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    discoverMovies: builder.query<Array<TmdbMovieSimple>, number | void>({
      query: (page = 1) => `tmdb/discover/movie?page=${page}`,
      transformResponse: ({ data: { results } }) => results,
    }),
    getTmdbImageBaseUrls: builder.query<TmdbImageBaseUrls, void>({
      query: () => 'tmdb/configuration',
      transformResponse: ({
        data: { images: config },
      }: TAPIResponse<{ images: TmdbConfiguration }>) => {
        return {
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
      },
    }),
    getGenres: builder.query<Record<number, string>, void>({
      query: () => `tmdb/genre/movie/list`,
      transformResponse: ({
        data: { genres },
      }: TAPIResponse<{ genres: { id: number; name: string }[] }>) =>
        genres.reduce((acc: Record<number, string>, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {}),
    }),
    getMovieById: builder.query<TmdbMovieDetailed, string>({
      query: (id) => `tmdb/movie/${id}`,
      transformResponse: (res: TAPIResponse<TmdbMovieDetailed>) => res.data,
    }),
    getMovieCreditsById: builder.query<TmdbCredits, string>({
      query: (id) => `tmdb/movie/${id}/credits`,
    }),
  }),
});

export const {
  useDiscoverMoviesQuery,
  useGetTmdbImageBaseUrlsQuery,
  useGetMovieCreditsByIdQuery,
  useGetGenresQuery,
  useGetMovieByIdQuery,
} = moviesApi;
