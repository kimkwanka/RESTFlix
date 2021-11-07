import { TRootState } from '../types';

interface ThunkApi {
  getState(): unknown;
  rejectWithValue(value: unknown, meta: unknown): unknown;
  fulfillWithValue(value: unknown, meta: unknown): unknown;
}

export const thunkFetch = async ({
  url,
  method = 'GET',
  useAuth = true,
  body = undefined,
  thunkAPI: { getState, rejectWithValue, fulfillWithValue },
  meta = undefined,
}: {
  url: string;
  method?: string;
  useAuth?: boolean;
  body?: BodyInit | undefined;
  thunkAPI: ThunkApi;
  meta?: string | undefined;
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

    const isText = response.headers.get('Content-Type')?.startsWith('text');

    if (response.ok) {
      const fulfilledResponse = isText
        ? await response.text()
        : await response.json();
      return fulfillWithValue(fulfilledResponse, meta);
    }

    const responseErrors = isText
      ? [await response.text()]
      : (await response.json()).errors.map((e: { msg: string }) => e.msg);

    console.error(responseErrors);

    return rejectWithValue(responseErrors, meta);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.toString() : err;
    console.error(err);
    return rejectWithValue([errorMessage], meta);
  }
};

export default thunkFetch;
