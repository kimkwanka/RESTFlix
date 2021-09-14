/* eslint-disable react/no-array-index-key */
import React from 'react';

import { connect } from 'react-redux';

import './MovieList.scss';

import MovieCard from '../MovieCard';
import VisibilityFilterInput from '../VisibilityFilterInput';

const MovieList = ({ movies, favoriteMovieIDs, visibilityFilter }) => {
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
            isFavorite={favoriteMovieIDs.indexOf(movie._id) !== -1}
          />
        </div>
      ))}
    </>
  );
};

export default connect((store) => ({
  visibilityFilter: store.visibilityFilter,
}))(MovieList);
