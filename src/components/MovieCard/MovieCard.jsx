import React from 'react';
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import PropTypes from 'prop-types';

import { useStore } from '../Hooks/useStoreContext';
import { useLoadingSpinner } from '../Hooks/useLoadingSpinnerContext';

import './MovieCard.scss';

const imgRoot = 'https://dry-sands-45830.herokuapp.com/img/';

const MovieCard = ({ movie }) => {
  const [storeState, setStoreState] = useStore();
  const [, setIsLoading] = useLoadingSpinner();

  const { user, token: jwtToken } = storeState;
  const { user: { _id: userID, FavoriteMovies } } = storeState;

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
        FavoriteMovies.push(movieID);

        setStoreState({
          ...storeState,
          user: {
            ...user, FavoriteMovies,
          },
        });
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
        const indexOfMovieIDToRemove = FavoriteMovies.indexOf(movieID);
        FavoriteMovies.splice(indexOfMovieIDToRemove, 1);

        setStoreState({
          ...storeState,
          user: {
            ...user, FavoriteMovies,
          },
        });
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
      <Card className="h-100 position-relative">
        {isFavorite ? <span className="favorite-star">★</span> : null}
        <Card.Img crossOrigin="anonymous" variant="top" src={`${imgRoot}${movie.ImagePath}`} />
        {!isFavorite
          ? <Button className="fav-btn align-self-end m-2 px-3 w-auto" variant="success" size="sm" onClick={(e) => addToFavorites(e, movie._id)}>+ Add favorite</Button>
          : <Button className="fav-btn align-self-end m-2 px-3 w-auto" variant="outline-danger" size="sm" onClick={(e) => removeFromFavorites(e, movie._id)}>- Remove favorite</Button>}
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
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
};

export default React.memo(MovieCard);
