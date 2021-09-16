import { useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { setMovies } from '../redux/actions';

// Note the declaration and immediate execution of the async function inside useEffect().
// Declaration of this function outside of useEffect would necessitate useCallback for memoization.
// Check for more details:
// https://stackoverflow.com/questions/53332321/react-hook-warnings-for-async-function-in-useeffect-useeffect-function-must-ret

const useFetchMovies = () => {
  const jwtToken = useSelector((state) => state.token, shallowEqual);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('https://dry-sands-45830.herokuapp.com/movies/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        const data = await res.json();

        dispatch(setMovies(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMovies(jwtToken, dispatch);
  }, []);

  return () => {};
};

export default useFetchMovies;
