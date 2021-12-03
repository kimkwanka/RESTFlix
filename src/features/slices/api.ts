import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import {
  TmdbConfiguration,
  TmdbImageBaseUrls,
  TmdbCredits,
  TRootState,
  TmdbMovieSimple,
  TmdbMovieDetailed,
  TAppDispatch,
} from '@features/types';

import { silentRefresh } from '@features/actions';

const baseUrl = import.meta.env.VITE_MOVIE_API_URL as string;

type TAPIResponse<T> = {
  data: T;
  errors: { message: string }[];
};

let tokenRefreshPromise: ReturnType<TAppDispatch> = null;

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
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!tokenRefreshPromise) {
      tokenRefreshPromise = api.dispatch(silentRefresh());
    }

    await tokenRefreshPromise;
    tokenRefreshPromise = null;

    result = await baseQuery(args, api, extraOptions);
  }
  return result;
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
