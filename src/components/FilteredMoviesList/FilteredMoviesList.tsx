import { memo } from 'react';
import { Link } from 'react-router-dom';

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

  const paginationLinks = [];

  for (let i = page; i < page + 10; i++) {
    paginationLinks.push(
      <Link key={`/${i}`} to={`/${i}`}>
        {i}
      </Link>,
    );
  }

  return (
    <>
      <div className="pagination-links">{paginationLinks}</div>
      <div className="filtered-movies-list">
        {filteredMovies?.map((movie) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default memo(FilteredMoviesList);
