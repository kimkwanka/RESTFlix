import React from 'react';

import { useAppSelector } from '../../features/hooks';

import { IState } from '../../features/types';

import FilteredMoviesList from '../../components/FilteredMoviesList/FilteredMoviesList';

import './GenreView.scss';

const selectGenreByName = (state: IState, genreName: string) => {
  const movieWithGenre = state.movies.find(
    (movie) => movie.genre.name === genreName,
  );
  return movieWithGenre?.genre;
};

interface IGenreViewProps {
  match: {
    params: {
      genreName: string;
    };
  };
}

const GenreView = ({
  match: {
    params: { genreName },
  },
}: IGenreViewProps) => {
  const genre = useAppSelector((state) => selectGenreByName(state, genreName));

  return (
    <div className="genre-view">
      <div className="genre-view__details">
        <h1 className="genre-view__name">{genre?.name}</h1>
        <div className="genre-view__description">{genre?.description}</div>
        <h2>Movies of this genre:</h2>
        <FilteredMoviesList
          filterFunc={(movie) =>
            movie.genre.name.toLowerCase() === genreName.toLowerCase()
          }
        />
      </div>
    </div>
  );
};

export default GenreView;
