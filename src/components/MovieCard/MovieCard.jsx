import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import './MovieCard.scss';

import * as actions from '../../redux/actions';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieCard = ({
  movie, loggedInUser, jwtToken, addFavoriteMovie, removeFavoriteMovie, setIsLoading,
}) => {
  const { _id: userID, FavoriteMovies } = loggedInUser;

  const isFavorite = FavoriteMovies.indexOf(movie._id) !== -1;

  const addToFavorites = async (e, movieID) => {
    try {
      // Stop button from triggering the outer <Link />
      e.preventDefault();

      setIsLoading(true);

      const res = await fetch(`https://dry-sands-45830.herokuapp.com/users/${userID}/movies/${movieID}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (res.status === 200) {
        addFavoriteMovie(movieID);
      } else {
        const addFavoriteError = await res.text();

        console.error(addFavoriteError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromFavorites = async (e, movieID) => {
    try {
      // Stop button from triggering the outer <Link />
      e.preventDefault();

      setIsLoading(true);

      const res = await fetch(`https://dry-sands-45830.herokuapp.com/users/${userID}/movies/${movieID}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (res.status === 200) {
        removeFavoriteMovie(movieID);
      } else {
        const removeFavoriteError = await res.text();

        console.error(removeFavoriteError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Link className="movie-card h-100" to={`movies/${movie._id}`}>
      <div className="h-100 position-relative">
        {isFavorite ? <span className="favorite-star">★</span> : null}
        <img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} alt={movie.Title} />
        {!isFavorite
          ? <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="success" size="sm" onClick={(e) => addToFavorites(e, movie._id)}>+ Add favorite</button>
          : <button type="button" className="fav-btn align-self-end m-2 px-3 w-auto" variant="outline-danger" size="sm" onClick={(e) => removeFromFavorites(e, movie._id)}>- Remove favorite</button>}
        <div className="card-body">
          <div className="card-title">{movie.Title}</div>
          <div className="card-text">{movie.Description}</div>
        </div>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  loggedInUser: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  jwtToken: PropTypes.string.isRequired,
  addFavoriteMovie: PropTypes.func.isRequired,
  removeFavoriteMovie: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default connect((store) => ({
  loggedInUser: store.user,
  jwtToken: store.token,
}), {
  addFavoriteMovie: actions.addFavoriteMovie,
  removeFavoriteMovie: actions.removeFavoriteMovie,
  setIsLoading: actions.setIsLoading,
})(React.memo(MovieCard));
