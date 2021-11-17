import { TRootState } from '../types';

interface ThunkApi {
  getState(): unknown;
  rejectWithValue(value: unknown, meta?: unknown): unknown;
}

export const thunkFetch = async ({
  url,
  method = 'GET',
  useAuth = true,
  body = undefined,
  thunkAPI: { getState, rejectWithValue },
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

    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization,
      },
      body,
    });

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
