import { TRootState, TAppDispatch } from '@features/types';

import { getNewTokens } from '@features/actions';

interface ThunkApi {
  getState(): unknown;
  rejectWithValue(value: unknown, meta?: unknown): unknown;
  dispatch: TAppDispatch;
}

let tokenRefreshPromise: ReturnType<TAppDispatch> = null;

export const thunkFetch = async ({
  url,
  method = 'GET',
  useAuth = true,
  body = undefined,
  thunkAPI: { getState, rejectWithValue, dispatch },
}: {
  url: string;
  method?: string;
  useAuth?: boolean;
  body?: BodyInit | undefined;
  thunkAPI: ThunkApi;
}) => {
  try {
    let Authorization = '';

    if (useAuth) {
      const jwtToken = (getState() as TRootState).user.token;
      Authorization = `Bearer ${jwtToken}`;
    }

    let response = await fetch(url, {
      body,
      credentials: 'include', // needed to be able to receive server cookies
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization,
      },
      method,
    });

    // If request was rejected because of missing or invalid access token,
    // try to get a new token pair from the server if such a request isn't already pending.
    // After the Promise has resolved, retry the request once more.
    if (response.status === 401) {
      if (!tokenRefreshPromise) {
        tokenRefreshPromise = dispatch(getNewTokens());
      }
      await tokenRefreshPromise;
      tokenRefreshPromise = null;

      // Grab the new access token and try again
      if (useAuth) {
        const jwtToken = (getState() as TRootState).user.token;
        Authorization = `Bearer ${jwtToken}`;
      }

      response = await fetch(url, {
        body,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization,
        },
        method,
      });
    }

    const data = await response.json();

    if (data?.errors?.length) {
      return rejectWithValue(data);
    }

    return data;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.toString() : err;
    console.error(err);
    return rejectWithValue([errorMessage]);
  }
};

export default thunkFetch;
