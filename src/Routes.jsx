import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import LoginView from './views/LoginView/LoginView';
import RegistrationView from './views/RegistrationView/RegistrationView';
import HomeView from './views/HomeView/HomeView';
import MovieView from './views/MovieView/MovieView';
import GenreView from './views/GenreView/GenreView';
import DirectorView from './views/DirectorView/DirectorView';
import ProfileView from './views/ProfileView/ProfileView';

const Routes = () => {
  const loggedInUser = useSelector((state) => state.user);
  // Redirect all routes except /login and /register when not logged in

  return (
    <Switch>
      <Route exact path="/login" component={LoginView} />
      <Route exact path="/register" component={RegistrationView} />
      {!loggedInUser && <Redirect from="*" to="/login" />}
      <Route exact path="/" component={HomeView} />
      <Route exact path="/movies/:movieID" component={MovieView} />
      <Route exact path="/genres/:genreName" component={GenreView} />
      <Route exact path="/directors/:directorName" component={DirectorView} />
      <Route exact path="/profile" component={ProfileView} />
    </Switch>
  );
};

export default Routes;
