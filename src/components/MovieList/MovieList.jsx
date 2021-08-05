/* eslint-disable react/no-array-index-key */
import React from 'react';

import Col from 'react-bootstrap/Col';

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
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((movie, i) => (
        <Col className="mb-4" md={4} key={i}>
          <MovieCard
            key={movie._id}
            movie={movie}
            isFavorite={favoriteMovieIDs.indexOf(movie._id) !== -1}
          />
        </Col>
      ))}
    </>
  );
};

export default connect((store) => ({
  visibilityFilter: store.visibilityFilter,
}))(MovieList);
