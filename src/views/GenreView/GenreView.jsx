import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import './GenreView.scss';

const selectGenreByName = (state, genreName) => {
  const movieWithGenre = state.movies.find(
    (movie) => movie.genre.name === genreName,
  );
  return movieWithGenre.genre;
};

const GenreView = ({
  match: {
    params: { genreName },
  },
}) => {
  const genre = useSelector((state) => selectGenreByName(state, genreName));

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="card-Body">
        <div className="card-Title">{genre.name}</div>
        <div className="card-text">{genre.description}</div>
      </div>
    </div>
  );
};

GenreView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      genreName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default GenreView;
