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

  const addToFavorites = (e, movieID) => {
    e.preventDefault();
    dispatch(addMovieToFavorites(movieID));
  };

  const removeFromFavorites = (e, movieID) => {
    e.preventDefault();
    dispatch(removeMovieFromFavorites(movieID));
  };

  return (
    <Link className="movie-card h-100" to={`movies/${movie._id}`}>
      <div className="h-100 position-relative">
        {isFavorite ? <span className="favorite-star">★</span> : null}
        <img className="card-img" crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.imageUrl}`} alt={movie.title} />
        {!isFavorite
          ? <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="success" size="sm" onClick={(e) => addToFavorites(e, movie._id)}>+ Add favorite</button>
          : <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="outline-danger" size="sm" onClick={(e) => removeFromFavorites(e, movie._id)}>- Remove favorite</button>}
        <div className="card-body">
          <div className="card-title">{movie.title}</div>
          <div className="card-text">{movie.description}</div>
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
  }).isRequired,
};

export default React.memo(MovieCard);
