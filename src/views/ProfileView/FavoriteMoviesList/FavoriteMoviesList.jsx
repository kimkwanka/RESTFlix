/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchMovies } from '../../../redux';

import MovieCard from '../../../components/MovieCard/MovieCard';

import './FavoriteMoviesList.scss';

const favoriteMoviesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    return () => {};
  }, []);

  const movies = useSelector((state) => state.movies);
  const favoriteMovieIDs = useSelector((state) => state.user.data.favoriteMovies);
  const favoriteMoviesArray = [];

  if (movies.length > 0) {
    favoriteMovieIDs.forEach((favoriteMovieID) => {
      const movieFoundById = movies.find(
        (movie) => movie._id === favoriteMovieID,
      );
      favoriteMoviesArray.push(movieFoundById);
    });
  }

  return (
    <div>
      {favoriteMoviesArray.map((movie, i) => (
        <div className="mb-4" md={4} key={i}>
          <MovieCard key={movie._id} movie={movie} isFavorite />
        </div>
      ))}
    </div>
  );
};

export default favoriteMoviesList;
