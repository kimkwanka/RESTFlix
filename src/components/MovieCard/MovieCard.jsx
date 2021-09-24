import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import './MovieCard.scss';

import { addMovieToFavorites, removeMovieFromFavorites } from '../../redux';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const favoriteMovies = useSelector((state) => state.user.data.favoriteMovies);
  const isFavorite = favoriteMovies.indexOf(movie._id) !== -1;

  const addToFavorites = (e, movieId) => {
    e.preventDefault();
    dispatch(addMovieToFavorites(movieId));
  };

  const removeFromFavorites = (e, movieId) => {
    e.preventDefault();
    dispatch(removeMovieFromFavorites(movieId));
  };

  return (
    <div className="movie-card">
      <div className="movie-modal">
        {isFavorite ? (
          <span className="movie-card__favorite-heart">&#x2661;</span>
        ) : null}
        <Link className="movie-card__wrapper-link" to={`movies/${movie._id}`}>
          <img
            className="movie-card__img"
            crossOrigin="anonymous"
            src={`${imgRoot}${movie.imageUrl}`}
            alt={movie.title}
          />
        </Link>
        <div className="movie-modal__content">
          <div className="movie-modal__upper">
            <div className="movie-card__title">{movie.title}</div>
            {!isFavorite ? (
              <button
                type="button"
                className="movie-modal__fav-btn clear"
                size="sm"
                onClick={(e) => addToFavorites(e, movie._id)}
              >
                &#10010; &#x2661;
              </button>
            ) : (
              <button
                type="button"
                className="movie-modal__fav-btn clear--secondary"
                size="sm"
                onClick={(e) => removeFromFavorites(e, movie._id)}
              >
                &#8722; &#x2661;
              </button>
            )}
          </div>
          <div className="movie-card__body">
            <div className="movie-card__description">{movie.description}</div>
            <div className="movie-card__details">
              <div className="movie-card__genre">{movie.genre.name}</div>
              <div className="movie-card__rating">&#9733; 6.8</div>
            </div>
          </div>
        </div>
      </div>
      {isFavorite ? (
        <span className="movie-card__favorite-heart">&#x2661;</span>
      ) : null}
      <Link className="movie-card__wrapper-link" to={`movies/${movie._id}`}>
        <img
          className="movie-card__img"
          crossOrigin="anonymous"
          src={`${imgRoot}${movie.imageUrl}`}
          alt={movie.title}
        />
      </Link>
      <div className="movie-card__title">{movie.title}</div>
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
