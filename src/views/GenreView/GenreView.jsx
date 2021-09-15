import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

import './GenreView.scss';

const GenreView = ({ jwtToken, match: { params: { genreName } }, setIsLoading }) => {
  const [genre, getGenre] = useState({ Title: '', Description: '' });

  useEffect(async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`https://dry-sands-45830.herokuapp.com/genres/${genreName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await res.json();
      getGenre(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jwtToken]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{genre.Name}</div>
        <div className="card-text">{genre.Description}</div>
      </div>
    </div>
  );
};

GenreView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      genreName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  jwtToken: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default connect((store) => ({
  jwtToken: store.token,
}), {
  setIsLoading: actions.setIsLoading,
})(GenreView);
