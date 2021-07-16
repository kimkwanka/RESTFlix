import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useLoadingSpinner } from '../Hooks/useLoadingSpinnerContext';

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
    <Card className="d-flex flex-column align-items-center">
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
