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
    <div className="director-view">
      <div className="director-view__details">
        <h1 className="director-view__name">{director.name}</h1>
        <div className="director-view__birth">{`Year of Birth: ${director.birth}`}</div>
        {director.death && (
          <div className="director-view__death">{`Year of Death: ${director.death}`}</div>
        )}
        <div className="director-view__description">{director.bio}</div>
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
