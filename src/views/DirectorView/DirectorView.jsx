import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import './DirectorView.scss';

const selectDirectorByName = (state, directorName) => {
  const movieWithDirector = state.movies.find(
    (movie) => movie.director.name === directorName,
  );
  return movieWithDirector.director;
};

const DirectorView = ({
  match: {
    params: { directorName },
  },
}) => {
  const director = useSelector((state) =>
    selectDirectorByName(state, directorName));

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{director.name}</div>
        <div className="card-Text">{`Year of Birth: ${director.birth}`}</div>
        {director.Death && (
          <div className="card-Text">{`Year of Death: ${director.death}`}</div>
        )}
        <div className="card-Text">{director.bio}</div>
      </div>
    </div>
  );
};

DirectorView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      directorName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DirectorView;
