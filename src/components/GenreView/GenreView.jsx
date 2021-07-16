import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useLoadingSpinner } from '../Hooks/useLoadingSpinnerContext';

import './GenreView.scss';

const GenreView = ({ genreName, jwtToken, onBackClick }) => {
  const [genre, getGenre] = useState({ Title: '', Description: '' });

  const [, setIsLoading] = useLoadingSpinner();

  useEffect(async () => {
    if (!jwtToken) {
      return;
    }

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
    <Card className="d-flex flex-column align-items-center">
      <Card.Body>
        <Card.Title>{genre.Name}</Card.Title>
        <Card.Text>{genre.Description}</Card.Text>
      </Card.Body>
      <Button className="m-4" onClick={onBackClick}>Back</Button>
    </Card>
  );
};

GenreView.propTypes = {
  genreName: PropTypes.string.isRequired,
  jwtToken: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
};

GenreView.defaultProps = {
  jwtToken: '',
};

export default GenreView;
