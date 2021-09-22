export const thunkFetch = async ({
  url,
  method = 'GET',
  useAuth = true,
  body = null,
  thunkAPI: { getState, rejectWithValue, fulfillWithValue },
  meta = null,
}) => {
  try {
    let Authorization = '';

    if (useAuth) {
      const jwtToken = getState().user.token;
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

    const isText = response.headers.get('Content-Type').startsWith('text');

    if (response.ok) {
      const fulfilledResponse = isText
        ? await response.text()
        : await response.json();
      return fulfillWithValue(fulfilledResponse, meta);
    }

    const responseErrors = isText
      ? [await response.text()]
      : (await response.json()).errors.map((e) => e.msg);

    console.error(responseErrors);

    return rejectWithValue(responseErrors, meta);
  } catch (err) {
    console.error(err);
    return rejectWithValue([err.toString()], meta);
  }
};

export default thunkFetch;
