import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useFetchAndCallback } from '../../hooks/useFetch';

import './GenreView.scss';

const GenreView = ({ match: { params: { genreName } } }) => {
  const [genre, setGenre] = useState({ Title: '', Description: '' });

  useFetchAndCallback(`https://dry-sands-45830.herokuapp.com/genres/${genreName}`, setGenre);

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
};

export default GenreView;
