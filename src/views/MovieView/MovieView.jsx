import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './MovieView.scss';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

const MovieView = ({ match: { params: { movieID } } }) => {
  const movies = useSelector((state) => state.movies);
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
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieView;
