import { TmdbMovieSimple, TmdbMovieDetailed } from '@features/types';

import MovieCard from '@components/MovieCard/MovieCard';

import './MoviesList.scss';

interface IMoviesListProps {
  movies: TmdbMovieSimple[] | TmdbMovieDetailed[];
}

const MoviesList = ({ movies }: IMoviesListProps) => {
  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard key={`${movie.id}`} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
