/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector } from 'react-redux';

import { setMovies } from '../../../redux/actions';

import { useFetchAndDispatch } from '../../../hooks/useFetch';

import MovieCard from '../../../components/MovieCard/MovieCard';

import './FavoriteMoviesList.scss';

const FavoriteMoviesList = () => {
  useFetchAndDispatch('https://dry-sands-45830.herokuapp.com/movies/', setMovies);

  const movies = useSelector((state) => state.movies);
  const favoriteMovieIDs = useSelector((state) => state.user.FavoriteMovies);
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

export default FavoriteMoviesList;
