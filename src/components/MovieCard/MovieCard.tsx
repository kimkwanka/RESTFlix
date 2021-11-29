import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@features/hooks';

import { TmdbMovieSimple } from '@features/types';

import MovieModal from './MovieModal/MovieModal';

import './MovieCard.scss';

interface IMovieCardProps {
  movie: TmdbMovieSimple;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  const favoriteMovies = useAppSelector(
    (state) => state.user.data.favoriteMovies,
  );
  const isFavorite = favoriteMovies.indexOf(movie.id) !== -1;

  return (
    <div className="movie-card">
      <MovieModal movie={movie} />
      {isFavorite && <span className="movie-card__favorite-heart" />}
      <Link className="movie-card__wrapper-link" to={`/movies/${movie.id}`}>
        <img
          className="movie-card__img"
          crossOrigin="anonymous"
          src={movie.backdropUrl}
          alt={movie.title}
        />
      </Link>
    </div>
  );
};

export default memo(MovieCard);
