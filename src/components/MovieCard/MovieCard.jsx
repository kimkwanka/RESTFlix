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
    <Link className="movie-card__wrapper-link" to={`movies/${movie._id}`}>
      <div className="movie-card">
        {isFavorite ? <span className="movie-card__favorite-star">&#9733;</span> : null}
        <img className="movie-card__img" crossOrigin="anonymous" src={`${imgRoot}${movie.imageUrl}`} alt={movie.title} />
        {/* {!isFavorite
          ? <button type="button" className="movie-card__fav-btn" size="sm" onClick={(e) => addToFavorites(e, movie._id)}>+ Add favorite</button>
          : <button type="button" className="movie-card__fav-btn" size="sm" onClick={(e) => removeFromFavorites(e, movie._id)}>- Remove favorite</button>} */}

        <div className="movie-card__title">{movie.title}</div>
        <div className="movie-card__body">
          <div className="movie-card__genre">{movie.genre.name}</div>
          <div className="movie-card__rating">&#9733; 6.8</div>
        </div>
      </div>
    </Link>
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
