import { memo } from 'react';

import { TmdbMovieSimple, TmdbMovieDetailed } from '#state/types';

import MovieModal from './MovieModal/MovieModal';

import './MovieCard.scss';

interface IMovieCardProps {
  movie: TmdbMovieSimple | TmdbMovieDetailed;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  return (
    <div className="movie-card">
      <MovieModal movie={movie} />
    </div>
  );
};

export default memo(MovieCard);
