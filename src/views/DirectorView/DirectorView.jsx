import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useFetchAndCallback } from '../../hooks/useFetch';

import './DirectorView.scss';

const DirectorView = ({ match: { params: { directorName } } }) => {
  const [director, setDirector] = useState({
    Name: '', Bio: '', Birth: '', Death: '',
  });

  useFetchAndCallback(`https://dry-sands-45830.herokuapp.com/directors/${directorName}`, setDirector);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{director.Name}</div>
        <div className="card-Text">{`Year of Birth: ${director.Birth}`}</div>
        {director.Death !== '' ? <div className="card-Text">{`Year of Death: ${director.Death}`}</div> : null}
        <div className="card-Text">{director.Bio}</div>
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
