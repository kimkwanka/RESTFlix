import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import Routes from './Routes';

const App = ({ isLoading }) => (
  <>
    <LoadingSpinner isLoading={isLoading} />
    {Routes}
  </>
);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default connect((_store) => ({
  isLoading: _store.isLoading,
}))(App);
