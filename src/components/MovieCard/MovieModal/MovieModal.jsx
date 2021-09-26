import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import './MovieModal.scss';

import FavoriteButton from '../../FavoriteButton/FavoriteButton';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;
const videoRoot = `${process.env.MOVIE_API_URL}/video/`;

const MovieModal = ({ movie }) => {
  const favoriteMovies = useSelector((state) => state.user.data.favoriteMovies);
  const isFavorite = favoriteMovies.indexOf(movie._id) !== -1;

  const previewVideo = useRef(null);

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

  const videoUrl = movie.imageUrl.split('.')[0];

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
          src={`${videoRoot}${videoUrl}.webm`}
          crossOrigin="anonymous"
          muted
          loop
          type="video/webm"
        />
        <img
          className="movie-modal__img"
          crossOrigin="anonymous"
          src={`${imgRoot}${movie.imageUrl}`}
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

MovieModal.propTypes = {
  movie: PropTypes.PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default React.memo(MovieModal);
