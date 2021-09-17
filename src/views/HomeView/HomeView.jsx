import React from 'react';

import { Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import MoviesList from './MoviesList/MoviesList';

const HomeView = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    isLoggedIn
      ? <MoviesList />
      : <Redirect to="/login" />
  );
};

export default HomeView;
