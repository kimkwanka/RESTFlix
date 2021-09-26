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
  const favoriteMovieIds = useSelector(
    (state) => state.user.data.favoriteMovies,
  );
  const favoriteMoviesArray = [];

  if (movies.length > 0) {
    favoriteMovieIds.forEach((favoriteMovieId) => {
      const movieFoundById = movies.find(
        (movie) => movie._id === favoriteMovieId,
      );
      favoriteMoviesArray.push(movieFoundById);
    });
  }

  return (
    <div className="fav-movies-list">
      {favoriteMoviesArray.map((movie) => (
        <MovieCard key={movie._id} movie={movie} isFavorite />
      ))}
    </div>
  );
};

export default favoriteMoviesList;
