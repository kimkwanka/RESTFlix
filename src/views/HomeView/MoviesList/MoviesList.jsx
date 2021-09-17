/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchMovies } from '../../../redux';

import './MoviesList.scss';

import MovieCard from '../../../components/MovieCard/MovieCard';
import VisibilityFilterInput from './VisibilityFilterInput/VisibilityFilterInput';

const MovieList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    return () => {};
  }, []);

  const visibilityFilter = useSelector((state) => state.ui.visibilityFilter);
  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.data.FavoriteMovies);

  const filteredMovies = visibilityFilter !== ''
    ? movies.filter((movie) => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
    : movies;

  return (
    <>
      <div md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </div>
      {filteredMovies.map((movie, i) => (
        <div className="mb-4" md={4} key={i}>
          <MovieCard
            key={movie._id}
            movie={movie}
            isFavorite={favoriteMovies.indexOf(movie._id) !== -1}
          />
        </div>
      ))}
    </>
  );
};

export default (MovieList);
