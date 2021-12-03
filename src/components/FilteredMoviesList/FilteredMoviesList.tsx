import { memo } from 'react';

import { TmdbMovieSimple } from '@features/types';

import { useDiscoverMoviesQuery } from '@features/slices/api';

import MovieCard from '@components/MovieCard/MovieCard';

import './FilteredMoviesList.scss';

interface IFilteredMoviesListProps {
  filterFunc: (movie: TmdbMovieSimple) => boolean;
  allowDuplicates?: boolean;
}

const FilteredMoviesList = ({
  filterFunc,
  allowDuplicates,
}: IFilteredMoviesListProps) => {
  const { data: movies } = useDiscoverMoviesQuery(2);

  // Filter out movies by using the filterFunc.
  // Duplicates are optionally removed by creating a new Array from a Set of the filtered movies.
  // (Sets can't contain duplicate entries)
  const filteredMovies = allowDuplicates
    ? movies?.filter(filterFunc)
    : Array.from(new Set(movies?.filter(filterFunc)));

  return (
    <div className="movies-list">
      {filteredMovies?.map((movie) => (
        <MovieCard key={`${movie.id}`} movie={movie} />
      ))}
    </div>
  );
};

export default memo(FilteredMoviesList);
