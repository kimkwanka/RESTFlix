import { memo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '@features/hooks';

import { TmdbMovieSimple } from '@features/types';

import './MovieModal.scss';

import FavoriteButton from '@components/FavoriteButton/FavoriteButton';

interface MovieModalProps {
  movie: TmdbMovieSimple;
}

const MovieModal = ({ movie }: MovieModalProps) => {
  const favoriteMovies = useAppSelector(
    (state) => state.user.data.favoriteMovies,
  );

  const isFavorite = favoriteMovies.indexOf(movie.id) !== -1;

  const previewVideo = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  if (previewVideo.current) {
    // https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
    const video = previewVideo.current;

    const isPlaying = video.currentTime > 0 && !video.paused;

    if (isHovered && !isPlaying) {
      // previewVideo.current.play();
    }

    if (!isHovered && isPlaying) {
      // previewVideo.current.pause();
    }
  }

  return (
    <div
      className="movie-modal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorite && <span className="movie-modal__favorite-heart" />}
      <Link className="movie-modal__wrapper-link" to={`/movies/${movie.id}`}>
        <video
          ref={previewVideo}
          className="movie-modal__video"
          src=""
          crossOrigin="anonymous"
          muted
          loop
        />
        <img
          className="movie-modal__img"
          crossOrigin="anonymous"
          src={movie.backdropUrl}
          alt={movie.title}
        />
      </Link>
      <div className="movie-modal__content">
        <div className="movie-modal__upper">
          <div className="movie-modal__title">{movie.title}</div>
          <FavoriteButton movieId={movie.id} clear />
        </div>
        <div className="movie-modal__body">
          <div className="movie-modal__description">{movie.overview}</div>
          <div className="movie-modal__details">
            <div className="movie-modal__genre">{movie.genres.join(', ')}</div>
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
