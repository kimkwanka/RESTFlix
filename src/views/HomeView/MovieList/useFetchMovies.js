import { useEffect } from 'react';

const fetchMovies = async (jwtToken, setMovies) => {
  try {
    const res = await fetch('https://dry-sands-45830.herokuapp.com/movies/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await res.json();

    setMovies(data);
  } catch (err) {
    console.error(err);
  }
};

const useFetchMovies = (jwtToken, setMovies) => {
  useEffect(() => {
    fetchMovies(jwtToken, setMovies);
  }, []);

  return () => {};
};

export default useFetchMovies;
