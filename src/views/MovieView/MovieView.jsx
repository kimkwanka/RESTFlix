import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import './MovieView.scss';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

const MovieView = ({
  match: {
    params: { movieId },
  },
}) => {
  const movies = useSelector((state) => state.movies);
  const movie = movies.find((m) => m._id === movieId);

  return (
    <div className="movie-card d-flex flex-column align-items-center">
      <img
        crossOrigin="anonymous"
        src={`${imgRoot}${movie.imageUrl}`}
        alt={movie.title}
      />
      <div className="card-body">
        <div className="card-title">{movie.title}</div>
        <p>
          Genre:&nbsp;
          <Link to={`/genres/${movie.genre.name}`}>{movie.genre.name}</Link>
        </p>
        <p>
          Director:&nbsp;
          <Link to={`/directors/${movie.director.name}`}>
            {movie.director.name}
          </Link>
        </p>
        <div className="card-text">{movie.description}</div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      movieId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MovieView;
