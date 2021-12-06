import { memo } from 'react';

import { TmdbMovieSimple } from '@features/types';

import { useDiscoverMoviesQuery } from '@features/slices/api';

import MovieCard from '@components/MovieCard/MovieCard';

import './FilteredMoviesList.scss';

interface IFilteredMoviesListProps {
  filterFunc: (movie: TmdbMovieSimple) => boolean;
  page?: number;
}

const FilteredMoviesList = ({
  filterFunc,
  page = 1,
}: IFilteredMoviesListProps) => {
  const { data } = useDiscoverMoviesQuery(page);

  if (!data) {
    return null;
  }
  const movies = data ? data.movies : [];

  // Filter out movies by using the filterFunc.
  const filteredMovies = movies.filter(filterFunc);

  return (
    <div className="filtered-movies-list">
      {filteredMovies?.map((movie) => (
        <MovieCard key={`${movie.id}`} movie={movie} />
      ))}
    </div>
  );
};

export default memo(FilteredMoviesList);
