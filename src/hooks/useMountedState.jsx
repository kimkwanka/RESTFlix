/* eslint-disable no-underscore-dangle */
import { useEffect, useRef } from 'react';

const useMountedState = () => {
  const _isMounted = useRef(true);

  useEffect(() => () => {
    _isMounted.current = false;
  }, []);

  return () => _isMounted.current;
};

export default useMountedState;
