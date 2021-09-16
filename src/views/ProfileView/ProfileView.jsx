/* eslint-disable react/no-array-index-key */
/* eslint no-restricted-globals: ["error"] */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import useFetchMovies from '../../hooks/useFetchMovies';

import MovieCard from '../../components/MovieCard/MovieCard';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import * as actions from '../../redux/actions';

import './ProfileView.scss';

const FavoriteMovieList = ({ favoriteMovieIDs, allMovies }) => {
  const favoriteMovies = [];

  favoriteMovieIDs.forEach((favoriteMovieID) => {
    const movieFoundById = allMovies.find(
      (movie) => movie._id === favoriteMovieID,
    );
    favoriteMovies.push(movieFoundById);
  });

  return (
    <div>
      {favoriteMovies.map((movie, i) => (
        <div className="mb-4" md={4} key={i}>
          <MovieCard key={movie._id} movie={movie} isFavorite />
        </div>
      ))}
    </div>
  );
};

FavoriteMovieList.propTypes = {
  favoriteMovieIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  allMovies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const formatDate = (date) => {
  const inputDate = new Date(date);
  return inputDate.toISOString().substr(0, 10);
};

const ProfileView = ({
  loggedInUser,
  jwtToken,
  movies,
  setLoggedInUser,
  setErrors,
  setIsLoading,
}) => {
  const {
    Username, Email, Birthday, FavoriteMovies, _id,
  } = loggedInUser;

  const [newUserData, setNewUserData] = useState({
    ...loggedInUser,
    Password: '',
  });
  const [dataHasChanged, setDataHasChanged] = useState(false);

  const updateChangedStatus = () => {
    setDataHasChanged(
      newUserData.Username !== loggedInUser.Username
        || newUserData.Password !== ''
        || newUserData.Email !== loggedInUser.Email
        || formatDate(newUserData.Birthday) !== formatDate(loggedInUser.Birthday),
    );
  };

  const updateNewUserData = (key, value) => {
    setNewUserData({ ...newUserData, [key]: value });
  };

  const setUsername = (newUsername) => updateNewUserData('Username', newUsername);
  const setPassword = (newPassword) => updateNewUserData('Password', newPassword);
  const setEmail = (newEmail) => updateNewUserData('Email', newEmail);
  const setBirthday = (newBirthday) => updateNewUserData('Birthday', newBirthday);

  const updateFormRef = useRef();

  const isUpdateFormInputValid = () => updateFormRef.current.reportValidity();

  const deleteUser = async () => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        },
      );

      if (res.status === 200) {
        setLoggedInUser(null);
      } else {
        const userDeletionError = await res.text();
        console.error(res.status, userDeletionError);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async () => {
    try {
      if (!newUserData) {
        return;
      }

      setIsLoading(true);

      const res = await fetch(
        `https://dry-sands-45830.herokuapp.com/users/${_id}`,
        {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`,
          },
          body: JSON.stringify(newUserData),
        },
      );

      if (res.status === 200) {
        const updatedUserFromServer = await res.json();

        setLoggedInUser(updatedUserFromServer);
        setErrors([]);
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        setErrors([responseBodyText]);
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        setErrors(errorMessages);
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdateFormInputValid()) {
      updateUser(newUserData);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    const deletionConfirmed = confirm(
      'Do you really want to delete your account? This action is not reversible!',
    );

    if (deletionConfirmed) {
      deleteUser();
    }
  };

  useEffect(() => {
    updateChangedStatus();
  }, [newUserData, loggedInUser]);

  useFetchMovies();

  return (
    <div className="profile-view w-100">
      <h2>Profile</h2>
      <form className="d-flex flex-column mb-5 w-100" ref={updateFormRef}>
        <label htmlFor="formUsername">
          Username:
          <input
            id="formUsername"
            type="text"
            defaultValue={Username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            pattern="^[a-zA-Z0-9]+$"
          />
        </label>
        <label htmlFor="formPassword">
          Password:
          <input
            id="formPassword"
            type="password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="formEmail">
          Email:
          <input
            id="formEmail"
            type="email"
            defaultValue={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="formBirthday">
          Birthday:
          <input
            id="formBirthday"
            type="date"
            defaultValue={formatDate(Birthday)}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </label>
        <button
          disabled={!dataHasChanged}
          className="align-self-center w-auto mt-5"
          type="submit"
          variant="primary"
          onClick={handleSubmit}
        >
          Update Profile
        </button>
        <button
          className="align-self-end w-auto mt-5"
          type="submit"
          variant="danger"
          onClick={handleDelete}
        >
          DELETE Profile
        </button>
        <ErrorMessages />
      </form>
      {movies.length > 0 && FavoriteMovies.length > 0 ? (
        <>
          <h2>Favorite Movies</h2>
          <FavoriteMovieList
            allMovies={movies}
            favoriteMovieIDs={FavoriteMovies}
          />
        </>
      ) : null}
    </div>
  );
};

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  loggedInUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  jwtToken: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setErrors: PropTypes.func.isRequired,
  setLoggedInUser: PropTypes.func.isRequired,
};

export default connect(
  (store) => ({
    movies: store.movies,
    loggedInUser: store.user,
    jwtToken: store.token,
  }),
  {
    setLoggedInUser: actions.setUser,
    setErrors: actions.setErrors,
    setIsLoading: actions.setIsLoading,
  },
)(ProfileView);
