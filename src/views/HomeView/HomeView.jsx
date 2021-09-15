import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import MovieList from './MovieList/MovieList';

const HomeView = ({ loggedInUser }) => {
  console.log('HomeView', loggedInUser);
  return (
    loggedInUser
      ? <MovieList />
      : <Redirect to="/login" />
  );
};

HomeView.propTypes = {
  loggedInUser: PropTypes.shape({}),
};

HomeView.defaultProps = {
  loggedInUser: null,
};

export default connect((store) => ({
  loggedInUser: store.user,
}))(HomeView);
