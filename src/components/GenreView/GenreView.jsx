import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './GenreView.scss';

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

const GenreView = ({ genreName, jwtToken, onBackClick }) => {
  const [genre, getGenre] = useState({ Title: '', Description: '' });

  useEffect(async () => {
    if (!jwtToken) {
      return;
    }

    const loadingSpinner = showLoadingSpinner();

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
      hideLoadingSpinner(loadingSpinner);
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
