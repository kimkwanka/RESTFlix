/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import {
  Route, withRouter, Switch, Redirect, Link,
} from 'react-router-dom';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

import './MainView.scss';

import { useLoadingSpinner } from '../../hooks/useLoadingSpinnerContext';

import LoginView from '../LoginView';
import RegistrationView from '../RegistrationView';
import MovieList from '../MovieList';
import MovieView from '../MovieView';
import GenreView from '../GenreView';
import DirectorView from '../DirectorView';
import ProfileView from '../ProfileView';

import LoadingSpinner from '../LoadingSpinner';

const MainView = ({
  history, setMovies, movies, jwtToken, loggedInUser, setLoggedInUser, setJWTToken, setErrors,
}) => {
  const [isLoading, setIsLoading] = useLoadingSpinner();

  const setRoute = (route) => {
    setErrors([]);
    history.push(route);
  };

  const goBack = React.useCallback(() => history.goBack(), []);

  const logoutCurrentUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    setLoggedInUser(null);
    setJWTToken('');
    setMovies([]);
    setErrors([]);

    history.push('/');
  };

  useEffect(async () => {
    if (!loggedInUser) {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      const savedToken = localStorage.getItem('token');

      if (savedUser) {
        setLoggedInUser(savedUser);
        setJWTToken(savedToken);

        setErrors([]);
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

      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jwtToken]);

  return (
    <div className="container">
      <LoadingSpinner isLoading={isLoading} />
      { loggedInUser
        ? (
          <div className="m-3">
            <div className="d-flex justify-content-end" md={12}>
              <Link className="btn btn-primary mr-3" to="/movies">Movies</Link>
              <Link className="btn btn-primary mr-5" to="/profile">Profile</Link>
              <button type="button" variant="secondary" onClick={logoutCurrentUser}>Log out</button>
            </div>
          </div>
        ) : null}
      <div className="main-view justify-content-md-center">
        <Switch>
          <Route exact path="/">
            {!loggedInUser
              ? (
                <div className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <button type="button" className="mb-3" onClick={() => setRoute('/register')}>Sign Up</button>
                  <button type="button" onClick={() => setRoute('/login')}>Log in</button>
                </div>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/login">
            {!loggedInUser
              ? (
                <div className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <LoginView />
                  <button type="button" variant="secondary" className="mt-4" onClick={goBack}>Back</button>
                </div>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/register">
            {!loggedInUser
              ? (
                <div className="d-flex flex-column justify-content-center align-items-center" md={3}>
                  <RegistrationView />
                  <button type="button" variant="secondary" className="mt-4" onClick={goBack}>Back</button>
                </div>
              )
              : <Redirect to="/movies" />}
          </Route>
          <Route exact path="/profile">
            {loggedInUser
              ? (
                <div className="d-flex flex-column justify-content-center align-items-center" md={12}>
                  <ProfileView logoutCurrentUser={logoutCurrentUser} />
                  <button type="button" variant="secondary" className="mt-4" onClick={goBack}>Back</button>
                </div>
              )
              : <Redirect to="/" />}
          </Route>
          <Route
            exact
            path="/directors/:director_name"
            render={({ match }) => (
              <div md={8}>
                <DirectorView
                  directorName={match.params.director_name}
                  jwtToken={jwtToken}
                  onBackClick={goBack}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/genres/:genre_name"
            render={({ match }) => (
              <div md={8}>
                <GenreView
                  genreName={match.params.genre_name}
                  jwtToken={jwtToken}
                  onBackClick={goBack}
                />
              </div>
            )}
          />
          <Route
            exact
            path="/movies/:movie_id"
            render={({ match }) => {
              const movieFoundByID = movies.find((movie) => movie._id === match.params.movie_id);
              return (
                <div md={8}>
                  <MovieView movie={movieFoundByID} onBackClick={goBack} />
                </div>
              );
            }}
          />
          <Route exact path="/movies">
            {loggedInUser
              ? <MovieList movies={movies} favoriteMovieIDs={loggedInUser.FavoriteMovies} />
              : <Redirect to="/" />}
          </Route>
        </Switch>
      </div>
    </div>
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

export default connect((store) => ({
  movies: store.movies,
  loggedInUser: store.user,
  jwtToken: store.token,
}), {
  setMovies: actions.setMovies,
  setLoggedInUser: actions.setUser,
  setJWTToken: actions.setToken,
  setErrors: actions.setErrors,
})(withRouter(MainView));
