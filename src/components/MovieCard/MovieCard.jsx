import React from 'react';
import PropTypes from 'prop-types';

import './MovieCard.scss';

const MovieCard = ({ movie, onClick }) => (
  <div
    role="link"
    tabIndex="0"
    className="movie-card"
    onClick={onClick}
    onKeyDown={
    ({ keyCode }) => {
      if (keyCode === 13 || keyCode === 32) {
        onClick();
      }
    }
  }
  >
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
  </div>
);

MovieCard.propTypes = {
  movie: PropTypes.objectOf(PropTypes.shape).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MovieCard;
