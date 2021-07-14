/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PropTypes from 'prop-types';

import MovieCard from '../MovieCard';

import './ProfileView.scss';

import { useStoreContext } from '../Store';

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

const ProfileView = ({ history }) => {
  const [newUser, setNewUser] = useState({
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  });

  const setUsername = (Username) => setNewUser({ ...newUser, Username });
  const setPassword = (Password) => setNewUser({ ...newUser, Password });
  const setEmail = (Email) => setNewUser({ ...newUser, Email });
  const setBirthday = (Birthday) => setNewUser({ ...newUser, Birthday });

  const [storeState, setStoreState] = useStoreContext();

  const {
    user: loggedInUser, token: jwtToken, movies,
  } = storeState;

  const {
    Username, Password, Email, Birthday, FavoriteMovies,
  } = loggedInUser;

  const registerUser = async () => {
    try {
      if (!newUser) {
        return;
      }

      const res = await fetch('https://dry-sands-45830.herokuapp.com/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.status === 201) {
        await res.json();

        setStoreState({ ...storeState, errorMessages: [] });
        history.push('/');
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
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(newUser);
  };

  return (
    <div className="profile-view">
      <h2>Profile</h2>
      <Form className="d-flex flex-column mb-5">
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" defaultValue={Username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" defaultValue={Password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="text" defaultValue={Email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="text" defaultValue={Birthday} onChange={(e) => setBirthday(e.target.value)} />
        </Form.Group>
        <Button className="align-self-center w-auto mt-5" type="submit" variant="primary" onClick={handleSubmit}>Update Profile</Button>
      </Form>
      <h2>Favorite Movies</h2>
      <FavoriteMovieList allMovies={movies} favoriteMovieIDs={FavoriteMovies} />
    </div>
  );
};

ProfileView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ProfileView);
