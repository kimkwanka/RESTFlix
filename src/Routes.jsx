import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginView from './views/LoginView/LoginView';
import HomeView from './views/HomeView/HomeView';
import MovieView from './views/MovieView/MovieView';
import GenreView from './views/GenreView/GenreView';
import DirectorView from './views/DirectorView/DirectorView';
import ProfileView from './views/ProfileView/ProfileView';

const Routes = (
  <Switch>
    <Route exact path="/login" component={LoginView} />
    <Route exact path="/" component={HomeView} />
    <Route exact path="/movies/:movieID" component={MovieView} />
    <Route exact path="/genres/:genreName" component={GenreView} />
    <Route exact path="/directors/:directorName" component={DirectorView} />
    <Route exact path="/profile" component={ProfileView} />
  </Switch>
);

export default (Routes);
