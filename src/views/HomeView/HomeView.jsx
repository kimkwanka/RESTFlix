import React from 'react';

import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import MoviesList from './MoviesList/MoviesList';

const HomeView = () => {
  const loggedInUser = useSelector((state) => state.user);

  return (
    loggedInUser
      ? <MoviesList />
      : <Redirect to="/login" />
  );
};

export default HomeView;
