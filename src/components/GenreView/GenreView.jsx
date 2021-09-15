import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useLoadingSpinner } from '../../hooks/useLoadingSpinnerContext';

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
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{genre.Name}</div>
        <div className="card-text">{genre.Description}</div>
      </div>
      <button type="button" className="m-4" onClick={onBackClick}>Back</button>
    </div>
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
