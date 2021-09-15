import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as actions from '../../redux/actions';

import './DirectorView.scss';

const DirectorView = ({ jwtToken, match: { params: { directorName } }, setIsLoading }) => {
  const [director, setDirector] = useState({
    Name: '', Bio: '', Birth: '', Death: '',
  });

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
    </div>
  );
};

DirectorView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      directorName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  jwtToken: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default connect((store) => ({
  jwtToken: store.token,
}), {
  setIsLoading: actions.setIsLoading,
})(DirectorView);
