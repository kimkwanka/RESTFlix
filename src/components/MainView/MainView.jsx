/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Route, withRouter, Switch, Redirect, Link,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MainView.scss';

import { useStoreContext } from '../Store';
import LoginView from '../LoginView';
import RegistrationView from '../RegistrationView';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';
import GenreView from '../GenreView';
import DirectorView from '../DirectorView';
import ProfileView from '../ProfileView';

import LoadingSpinner from '../LoadingSpinner';

const MovieList = ({ movies }) => (
  movies.map((movie, i) => (
    <Col className="mb-4" md={4} key={i}>
      <MovieCard key={movie._id} movie={movie} />
    </Col>
  ))
);

const MainView = ({ history }) => {
  const [isLoading, setIsLoading] = useState(false);

  // const [movies, setMovies] = useState([]);
  const [storeState, setStoreState] = useStoreContext();

  const {
    user: loggedInUser, token: jwtToken, movies,
  } = storeState;

  const setRoute = (route) => {
    setStoreState({ ...storeState, errorMessages: [] });
    history.push(route);
  };

  const goBack = React.useCallback(() => history.goBack(), []);

  const logoutCurrentUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setStoreState({
      user: null, token: null, errorMessages: [], movies: [],
    });
    history.push('/');
  };

  useEffect(async () => {
    if (!loggedInUser) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const savedToken = localStorage.getItem('token');

      if (savedUser) {
        setStoreState({
          ...storeState, user: savedUser, token: savedToken, errorMessages: [],
        });
      }

      return;
    }

    if (movies.length > 0) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://dry-sands-45830.herokuapp.com/movies/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await res.json();
      setStoreState({
        ...storeState, movies: data,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jwtToken]);

  return (
    <Container>
      { loggedInUser
        ? (
          <Row className="m-3">
            <Col className="d-flex justify-content-end" md={12}>
              <Link className="btn btn-primary mr-3" to="/movies">Movies</Link>
              <Link className="btn btn-primary mr-5" to="/profile">Profile</Link>
              <Button variant="secondary" onClick={logoutCurrentUser}>Log out</Button>
            </Col>
          </Row>
        ) : null}
      <Row className="main-view m-3 justify-content-md-center">
        <LoadingSpinner isLoading={isLoading} />
        <Switch>
          <Route exact path="/">
            {!loggedInUser
              ? (
                <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <Button className="mb-3" onClick={() => setRoute('/register')}>Sign Up</Button>
                  <Button onClick={() => setRoute('/login')}>Log in</Button>
                </Col>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/login">
            {!loggedInUser
              ? (
                <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <LoginView />
                  <Button variant="secondary" className="mt-4" onClick={goBack}>Back</Button>
                </Col>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/register">
            {!loggedInUser
              ? (
                <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <RegistrationView />
                  <Button variant="secondary" className="mt-4" onClick={goBack}>Back</Button>
                </Col>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/profile">
            {loggedInUser
              ? (
                <Col className="d-flex flex-column justify-content-center align-items-center" md={12}>
                  <ProfileView />
                  <Button variant="secondary" className="mt-4" onClick={goBack}>Back</Button>
                </Col>
              )
              : <Redirect to="/" />}
          </Route>
          <Route
            exact
            path="/directors/:director_name"
            render={({ match }) => (
              <Col md={8}>
                <DirectorView
                  directorName={match.params.director_name}
                  jwtToken={jwtToken}
                  onBackClick={goBack}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/genres/:genre_name"
            render={({ match }) => (
              <Col md={8}>
                <GenreView
                  genreName={match.params.genre_name}
                  jwtToken={jwtToken}
                  onBackClick={goBack}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/movies/:movie_id"
            render={({ match }) => {
              const movieFoundByID = movies.find((movie) => movie._id === match.params.movie_id);
              return (
                <Col md={8}>
                  <MovieView movie={movieFoundByID} onBackClick={goBack} />
                </Col>
              );
            }}
          />
          <Route exact path="/movies">
            {loggedInUser
              ? <MovieList movies={movies} setSelectedMovie={null} />
              : <Redirect to="/" />}
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};

MainView.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape(),
  }).isRequired,
};

export default withRouter(MainView);
