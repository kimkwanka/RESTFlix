/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';

import { fetchMovies } from '../../redux';

import MovieCard from '../MovieCard/MovieCard';

import './FilteredMoviesList.scss';

const FilteredMoviesList = ({ filterFunc, allowDuplicates }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    return () => {};
  }, []);

  const movies = useSelector((state) => state.movies);

  // Filter out movies by using the filterFunc.
  // Duplicates are optionally removed by creating a new Array from a Set of the filtered movies.
  // (Sets can't contain duplicate entries)
  const filteredMovies = allowDuplicates
    ? movies.filter(filterFunc)
    : Array.from(new Set(movies.filter(filterFunc)));

  return (
    <div className="movies-list">
      {filteredMovies.map((movie, index) => (
        <MovieCard key={`${movie._id}${index}`} movie={movie} isFavorite />
      ))}
    </div>
  );
};

FilteredMoviesList.propTypes = {
  filterFunc: PropTypes.func.isRequired,
  allowDuplicates: PropTypes.bool,
};

FilteredMoviesList.defaultProps = {
  allowDuplicates: false,
};

export default React.memo(FilteredMoviesList);
