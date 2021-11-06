import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { IState, IMovie } from '../../features/types';

import MovieModal from './MovieModal/MovieModal';

import './MovieCard.scss';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

const MovieCard = ({ movie }: { movie: IMovie }) => {
  const favoriteMovies = useSelector(
    (state: IState) => state.user.data.favoriteMovies,
  );
  const isFavorite = favoriteMovies.indexOf(movie._id) !== -1;

  return (
    <div className="movie-card">
      <MovieModal movie={movie} />
      {isFavorite && <span className="movie-card__favorite-heart" />}
      <Link className="movie-card__wrapper-link" to={`/movies/${movie._id}`}>
        <img
          className="movie-card__img"
          crossOrigin="anonymous"
          src={`${imgRoot}${movie.slug}.jpg`}
          alt={movie.title}
        />
      </Link>
    </div>
  );
};

export default React.memo(MovieCard);
