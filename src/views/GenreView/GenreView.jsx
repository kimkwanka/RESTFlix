import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

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
    <div className="genre-view">
      <div className="genre-view__details">
        <h1 className="genre-view__name">{genre.name}</h1>
        <div className="genre-view__description">{genre.description}</div>
        <h2>Movies of this genre:</h2>
        <FilteredMoviesList
          filterFunc={(movie) =>
            movie.genre.name.toLowerCase() === genreName.toLowerCase()}
        />
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
