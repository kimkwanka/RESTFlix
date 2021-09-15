import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLoadingSpinner } from '../../hooks/useLoadingSpinnerContext';

import './DirectorView.scss';

const DirectorView = ({ directorName, jwtToken, onBackClick }) => {
  const [director, setDirector] = useState({
    Name: '', Bio: '', Birth: '', Death: '',
  });

  const [, setIsLoading] = useLoadingSpinner();

  useEffect(async () => {
    if (!jwtToken) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`https://dry-sands-45830.herokuapp.com/directors/${directorName}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await res.json();
      setDirector(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [jwtToken]);

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{director.Name}</div>
        <div className="card-Text">{`Year of Birth: ${director.Birth}`}</div>
        {director.Death !== '' ? <div className="card-Text">{`Year of Death: ${director.Death}`}</div> : null}
        <div className="card-Text">{director.Bio}</div>
      </div>
      <button type="button" className="m-4" onClick={onBackClick}>Back</button>
    </div>
  );
};

DirectorView.propTypes = {
  directorName: PropTypes.string.isRequired,
  jwtToken: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
};

DirectorView.defaultProps = {
  jwtToken: '',
};

export default DirectorView;
