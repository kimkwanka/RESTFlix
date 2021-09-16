import React from 'react';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import MoviesList from './MoviesList/MoviesList';

const HomeView = ({ loggedInUser }) => {
  // eslint-disable-next-line no-console
  console.log('HomeView', loggedInUser);
  return (
    loggedInUser
      ? <MoviesList />
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
