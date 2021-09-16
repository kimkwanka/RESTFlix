/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as actions from '../../../redux/actions';

import './MovieList.scss';

import MovieCard from '../../../components/MovieCard/MovieCard';
import VisibilityFilterInput from './VisibilityFilterInput';

import useFetchMovies from '../../../hooks/useFetchMovies';

const MovieList = ({
  movies,
  loggedInUser: { FavoriteMovies },
  visibilityFilter,
}) => {
  const filteredMovies = visibilityFilter !== ''
    ? movies.filter((movie) => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()))
    : movies;

  useFetchMovies();

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
            isFavorite={FavoriteMovies.indexOf(movie._id) !== -1}
          />
        </div>
      ))}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loggedInUser: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  visibilityFilter: PropTypes.string.isRequired,
};

MovieList.defaultProps = {
  loggedInUser: null,
};

export default connect(
  (store) => ({
    visibilityFilter: store.visibilityFilter,
    movies: store.movies,
    loggedInUser: store.user,
    jwtToken: store.token,
  }),
  {
    setMovies: actions.setMovies,
  },
)(MovieList);
