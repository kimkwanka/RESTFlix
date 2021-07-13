import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './DirectorView.scss';

const showLoadingSpinner = () => {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  const loadingSpinnerParent = document.querySelector('.main-view');

  loadingSpinnerParent.appendChild(loadingSpinner);
  return loadingSpinner;
};

const hideLoadingSpinner = (loadingSpinner) => {
  loadingSpinner.remove();
};

const DirectorView = ({ directorName, jwtToken, onBackClick }) => {
  const [director, setDirector] = useState({ Name: '', Bio: '', Birth: '', Death: '' });

  useEffect(async () => {
    if (!jwtToken) {
      return;
    }

    const loadingSpinner = showLoadingSpinner();

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
      hideLoadingSpinner(loadingSpinner);
    }
  }, [jwtToken]);

  return (
    <Card className="genre-card d-flex flex-column align-items-center">
      <Card.Body>
        <Card.Title>{director.Name}</Card.Title>
        <Card.Text>{`Year of Birth: ${director.Birth}`}</Card.Text>
        {director.Death !== '' ? <Card.Text>{`Year of Death: ${director.Death}`}</Card.Text> : null}
        <Card.Text>{director.Bio}</Card.Text>
      </Card.Body>
      <Button className="m-4" onClick={onBackClick}>Back</Button>
    </Card>
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
