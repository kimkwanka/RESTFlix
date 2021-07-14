/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import MovieCard from '../MovieCard';
import ErrorMessages from '../ErrorMessages';
import LoadingSpinner from '../LoadingSpinner';

import './ProfileView.scss';

import { useStore } from '../Hooks/useStoreContext';

const FavoriteMovieList = ({ favoriteMovieIDs, allMovies }) => {
  const favoriteMovies = [];

  favoriteMovieIDs.forEach((favoriteMovieID) => {
    const movieFoundById = allMovies.find((movie) => movie._id === favoriteMovieID);
    favoriteMovies.push(movieFoundById);
  });

  return (
    <Row>
      {
        favoriteMovies.map((movie, i) => (
          <Col className="mb-4" md={4} key={i}>
            <MovieCard key={movie._id} movie={movie} />
          </Col>
        ))
      }
    </Row>
  );
};

FavoriteMovieList.propTypes = {
  favoriteMovieIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
  allMovies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const ProfileView = () => {
  const [storeState, setStoreState] = useStore();

  const {
    user: loggedInUser, token: jwtToken, movies,
  } = storeState;

  const {
    Username, Email, Birthday, FavoriteMovies, _id,
  } = loggedInUser;

  const [newUserData, setNewUserData] = useState({ ...loggedInUser, Password: '' });
  const [dataHasChanged, setDataHasChanged] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const updateChangedStatus = () => {
    setDataHasChanged(newUserData.Username !== loggedInUser.Username || newUserData.Password !== '' || newUserData.Email !== loggedInUser.Email || newUserData.Birthday !== loggedInUser.Birthday);
  };

  const updateNewUserData = (key, value) => {
    setNewUserData({ ...newUserData, [key]: value });
  };

  const setUsername = (newUsername) => updateNewUserData('Username', newUsername);
  const setPassword = (newPassword) => updateNewUserData('Password', newPassword);
  const setEmail = (newEmail) => updateNewUserData('Email', newEmail);
  const setBirthday = (newBirthday) => updateNewUserData('Birthday', newBirthday);

  const updateUser = async () => {
    try {
      if (!newUserData) {
        return;
      }

      setIsUpdating(true);

      const res = await fetch(`https://dry-sands-45830.herokuapp.com/users/${_id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(newUserData),
      });

      if (res.status === 200) {
        const updatedUserFromServer = await res.json();

        setStoreState({ ...storeState, user: updatedUserFromServer, errorMessages: [] });
        updateChangedStatus();
      }

      if (res.status === 400) {
        const responseBodyText = await res.text();

        setStoreState({ ...storeState, errorMessages: [responseBodyText] });
        console.error(responseBodyText);
      }

      if (res.status === 422) {
        const responseBody = await res.json();
        const errorMessages = responseBody.errors.map((e) => e.msg);

        setStoreState({ ...storeState, errorMessages });
        console.error(responseBody.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(newUserData);
  };

  useEffect(() => {
    updateChangedStatus();
  }, [newUserData, loggedInUser]);

  return (
    <div className="profile-view">
      <LoadingSpinner isLoading={isUpdating} />
      <h2>Profile</h2>
      <Form className="d-flex flex-column mb-5">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" defaultValue={Username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" defaultValue="" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" defaultValue={Email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="text" defaultValue={Birthday} onChange={(e) => setBirthday(e.target.value)} />
        </Form.Group>
        <Button disabled={!dataHasChanged} className="align-self-center w-auto mt-5" type="submit" variant="primary" onClick={handleSubmit}>Update Profile</Button>
        <ErrorMessages />
      </Form>
      <h2>Favorite Movies</h2>
      <FavoriteMovieList allMovies={movies} favoriteMovieIDs={FavoriteMovies} />
    </div>
  );
};

export default ProfileView;
