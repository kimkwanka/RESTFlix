import { memo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { IState, IMovie } from '@features/types';

import './MovieModal.scss';

import FavoriteButton from '../../FavoriteButton/FavoriteButton';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;
const videoRoot = `${process.env.MOVIE_API_URL}/video/`;

interface MovieModalProps {
  movie: IMovie;
}

const MovieModal = ({ movie }: MovieModalProps) => {
  const favoriteMovies = useSelector(
    (state: IState) => state.user.data.favoriteMovies,
  );
  const isFavorite = favoriteMovies.indexOf(movie._id) !== -1;

  const previewVideo = useRef<HTMLVideoElement>(null);

  const [isHovered, setIsHovered] = useState(false);

  if (previewVideo.current) {
    // https://stackoverflow.com/questions/36803176/how-to-prevent-the-play-request-was-interrupted-by-a-call-to-pause-error
    const video = previewVideo.current;

    const isPlaying = video.currentTime > 0 && !video.paused;

    if (isHovered && !isPlaying) {
      previewVideo.current.play();
    }

    if (!isHovered && isPlaying) {
      previewVideo.current.pause();
    }
  }

  return (
    <div
      className="movie-modal"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isFavorite && <span className="movie-modal__favorite-heart" />}
      <Link className="movie-modal__wrapper-link" to={`/movies/${movie._id}`}>
        <video
          ref={previewVideo}
          className="movie-modal__video"
          src={`${videoRoot}${movie.slug}.webm`}
          crossOrigin="anonymous"
          muted
          loop
        />
        <img
          className="movie-modal__img"
          crossOrigin="anonymous"
          src={`${imgRoot}${movie.slug}.jpg`}
          alt={movie.title}
        />
      </Link>
      <div className="movie-modal__content">
        <div className="movie-modal__upper">
          <div className="movie-modal__title">{movie.title}</div>
          <FavoriteButton movieId={movie._id} clear />
        </div>
        <div className="movie-modal__body">
          <div className="movie-modal__description">{movie.description}</div>
          <div className="movie-modal__details">
            <div className="movie-modal__genre">{movie.genre.name}</div>
            <div className="movie-modal__rating">
              &#9733;
              {movie.rating}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieModal);
