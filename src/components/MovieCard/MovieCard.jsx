import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import MovieModal from './MovieModal/MovieModal';

import './MovieCard.scss';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

const MovieCard = ({ movie }) => {
  const favoriteMovies = useSelector((state) => state.user.data.favoriteMovies);
  const isFavorite = favoriteMovies.indexOf(movie._id) !== -1;

  return (
    <div className="movie-card">
      <MovieModal movie={movie} />
      {isFavorite && <span className="movie-card__favorite-heart" />}
      <Link className="movie-card__wrapper-link" to={`movies/${movie._id}`}>
        <img
          className="movie-card__img"
          crossOrigin="anonymous"
          src={`${imgRoot}${movie.imageUrl}`}
          alt={movie.title}
        />
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default React.memo(MovieCard);
