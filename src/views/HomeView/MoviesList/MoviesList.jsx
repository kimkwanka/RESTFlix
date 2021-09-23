/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { fetchMovies } from '../../../redux';

import './MoviesList.scss';

import MovieCard from '../../../components/MovieCard/MovieCard';
import SearchBar from './SearchBar/SearchBar';

const MovieList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    return () => {};
  }, []);

  const searchTerm = useSelector((state) => state.ui.searchTerm);
  const movies = useSelector((state) => state.movies);
  const favoriteMovies = useSelector((state) => state.user.data.favoriteMovies);

  const filteredMovies = searchTerm !== ''
    ? movies.filter((movie) => movie.Title.toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

  return (
    <>
      <div md={12} style={{ margin: '1em' }}>
        <SearchBar searchTerm={searchTerm} />
      </div>
      <div className="movies-list">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            isFavorite={favoriteMovies.indexOf(movie._id) !== -1}
          />
        ))}
      </div>
    </>
  );
};

export default (MovieList);
