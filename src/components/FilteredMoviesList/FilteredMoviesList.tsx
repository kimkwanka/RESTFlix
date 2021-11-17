/* eslint-disable react/no-array-index-key */
import { memo, useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '@features/hooks';
import { IMovie } from '@features/types';
import { fetchMovies } from '@features/actions';

import MovieCard from '@components/MovieCard/MovieCard';

import './FilteredMoviesList.scss';

interface IFilteredMoviesListProps {
  filterFunc: (movie: IMovie) => boolean;
  allowDuplicates?: boolean;
}

const FilteredMoviesList = ({
  filterFunc,
  allowDuplicates,
}: IFilteredMoviesListProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    return () => {};
  }, []);

  const movies = useAppSelector((state) => state.movies);

  // Filter out movies by using the filterFunc.
  // Duplicates are optionally removed by creating a new Array from a Set of the filtered movies.
  // (Sets can't contain duplicate entries)
  const filteredMovies = allowDuplicates
    ? movies.filter(filterFunc)
    : Array.from(new Set(movies.filter(filterFunc)));

  return (
    <div className="movies-list">
      {filteredMovies.map((movie, index: number) => (
        <MovieCard key={`${movie._id}${index}`} movie={movie} />
      ))}
    </div>
  );
};

export default memo(FilteredMoviesList);
