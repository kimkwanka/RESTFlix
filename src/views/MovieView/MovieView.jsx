import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import './MovieView.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieView = ({ movies, match: { params: { movieID } } }) => {
  const movie = movies.find((m) => m._id === movieID);

  return (
    <div className="movie-card d-flex flex-column align-items-center">
      <img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} alt={movie.Title} />
      <div className="card-body">
        <div className="card-title">{movie.Title}</div>
        <p>
          Genre:&nbsp;
          <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
        </p>
        <p>
          Director:&nbsp;
          <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
        </p>
        <div className="card-text">{movie.Description}</div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default connect((store) => ({
  movies: store.movies,
}))(MovieView);
