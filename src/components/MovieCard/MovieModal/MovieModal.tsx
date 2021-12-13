import { memo } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '#state/hooks';

import { TmdbMovieSimple, TmdbMovieDetailed } from '#state/types';

import './MovieModal.scss';

import FavoriteButton from '#components/FavoriteButton/FavoriteButton';

interface MovieModalProps {
  movie: TmdbMovieSimple | TmdbMovieDetailed;
}

const MovieModal = ({ movie }: MovieModalProps) => {
  const favoriteMovies = useAppSelector(
    (state) => state.user.data.favoriteMovies,
  );

  const isFavorite = favoriteMovies.indexOf(movie.id) !== -1;

  return (
    <div className="movie-modal">
      {isFavorite && <span className="movie-modal__favorite-heart" />}
      <Link className="movie-modal__wrapper-link" to={`/movies/${movie.id}`}>
        {movie.backdropUrl || movie.posterUrl ? (
          <img
            className="movie-modal__img"
            crossOrigin="anonymous"
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
          />
        ) : (
          <div className="movie-modal__img-placeholder">No image available</div>
        )}
      </Link>
      <div className="movie-modal__content">
        <div className="movie-modal__upper">
          <div className="movie-modal__title">{movie.title}</div>
          <FavoriteButton movieId={movie.id} clear />
        </div>
        <div className="movie-modal__body">
          <div className="movie-modal__description">{movie.overview}</div>
          <div className="movie-modal__details">
            <div className="movie-modal__genre">
              {movie.genres.map(({ name }) => name).join(', ')}
            </div>
            <div className="movie-modal__rating">
              &#9733;
              {movie.vote_average}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieModal);
