import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './MovieView.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieView = ({ movie, onBackClick }) => (
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
    <button type="button" className="m-4" onClick={onBackClick}>Back</button>
  </div>
);

MovieView.propTypes = {
  movie: PropTypes.PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape.isRequired,
    Genre: PropTypes.shape.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};

MovieView.defaultProps = {
  movie: {
    Title: '',
    Description: '',
    ImagePath: '',
    Director: {
      Name: '',
    },
    Genre: {
      Name: '',
    },
  },
};

export default MovieView;
