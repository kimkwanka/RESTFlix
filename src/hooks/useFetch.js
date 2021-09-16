import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setIsLoading } from '../redux/actions';

// Note the declaration and immediate execution of the async function inside useEffect().
// Declaration of this function outside of useEffect would necessitate useCallback for memoization.
// Check for more details:
// https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

const useFetch = (url, action, method = 'GET') => {
  const jwtToken = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setIsLoading(true));

        const res = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await res.json();

        dispatch(action(data));
      } catch (err) {
        console.error(err);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    fetchData();
  }, []);

  return () => {};
};

export default useFetch;
