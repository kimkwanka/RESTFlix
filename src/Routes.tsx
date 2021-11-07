import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAppSelector } from './features/hooks';

import LoginView from './views/LoginView/LoginView';
import RegistrationView from './views/RegistrationView/RegistrationView';
import HomeView from './views/HomeView/HomeView';
import MovieView from './views/MovieView/MovieView';
import GenreView from './views/GenreView/GenreView';
import DirectorView from './views/DirectorView/DirectorView';
import ProfileView from './views/ProfileView/ProfileView';

const Routes = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  // Redirect /login and /register to / if logged in.
  // Redirect all routes to /login (except /login and /register) when not logged in.

  const areMoviesLoaded = useAppSelector((state) => state.movies.length > 0);
  // Redirect Movie, Genre and DirectorView to / when movies haven't been fetched yet.

  return (
    <Switch>
      {isLoggedIn && <Redirect from="/login" to="/" />}
      {isLoggedIn && <Redirect from="/register" to="/" />}
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegistrationView} />

      {!isLoggedIn && <Redirect from="*" to="/login" />}
      <Route exact path="/" component={HomeView} />
      <Route exact path="/profile" component={ProfileView} />

      {!areMoviesLoaded && <Redirect from="*" to="/" />}
      <Route exact path="/movies/:movieId" component={MovieView} />
      <Route exact path="/genres/:genreName" component={GenreView} />
      <Route exact path="/directors/:directorName" component={DirectorView} />
    </Switch>
  );
};

export default Routes;
