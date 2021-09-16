/* eslint-disable react/no-array-index-key */
import React from 'react';

import { useSelector } from 'react-redux';

import { setMovies } from '../../../redux/actions';

import './MoviesList.scss';

import MovieCard from '../../../components/MovieCard/MovieCard';
import VisibilityFilterInput from './VisibilityFilterInput/VisibilityFilterInput';

import { useFetchAndDispatch } from '../../../hooks/useFetch';

const MovieList = () => {
  useFetchAndDispatch('https://dry-sands-45830.herokuapp.com/movies/', setMovies);

  const visibilityFilter = useSelector((state) => state.visibilityFilter);
  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.FavoriteMovies);

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
