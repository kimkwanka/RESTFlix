import { Link } from 'react-router-dom';

import { useAppSelector } from '../../features/hooks';

import { IMovie } from '../../features/types';

import FavoriteButton from '../../components/FavoriteButton/FavoriteButton';

import './MovieView.scss';

const imgRoot = `${process.env.MOVIE_API_URL}/img/`;

interface IMovieViewProps {
  match: {
    params: {
      movieId: string;
    };
  };
}

const MovieView = ({
  match: {
    params: { movieId },
  },
}: IMovieViewProps) => {
  const movies = useAppSelector((state) => state.movies);
  const movie = movies.find((m: IMovie) => m._id === movieId);

  return (
    <div className="movie-view">
      <img
        className="movie-view__background-image"
        crossOrigin="anonymous"
        src={`${imgRoot}${movie?.slug}.jpg`}
        alt={movie?.title}
      />
      <img
        className="movie-view__image"
        crossOrigin="anonymous"
        src={`${imgRoot}${movie?.slug}.jpg`}
        alt={movie?.title}
      />
      <div className="movie-view__details">
        <h1 className="movie-view__title">{movie?.title}</h1>
        <div className="movie-view__rating">
          IMDb Rating: &#9733;
          {movie?.rating}
        </div>
        <p className="movie-view__genre">
          Genre:&nbsp;
          <Link to={`/genres/${movie?.genre.name}`}>{movie?.genre.name}</Link>
        </p>
        <p className="movie-view__director">
          Director:&nbsp;
          <Link to={`/directors/${movie?.director.name}`}>
            {movie?.director.name}
          </Link>
        </p>
        <div className="movie-view__description">{movie?.description}</div>
        <div className="movie-view__button-wrapper">
          <FavoriteButton movieId={movie?._id} showText />
        </div>
      </div>
    </div>
  );
};

export default MovieView;
