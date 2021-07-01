import React from 'react';
import PropTypes from 'prop-types';

import './MovieView.scss';

const MovieView = ({ movie }) => (
  <div className="movie-view">
    <div className="movie-poster">
      <img src={movie.ImagePath} alt={movie.Title} />
    </div>
    <div className="movie-title">
      <span className="label">Title: </span>
      <span className="value">{movie.Title}</span>
    </div>
    <div className="movie-description">
      <span className="label">Description: </span>
      <span className="value">{movie.Description}</span>
    </div>
    <button type="button">Back</button>
  </div>
);

MovieView.propTypes = {
  movie: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default MovieView;
