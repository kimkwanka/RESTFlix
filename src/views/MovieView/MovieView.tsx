import { Link } from 'react-router-dom';

import { useGetMovieByIdQuery } from '@features/slices/api';

import { useAppSelector } from '@features/hooks';

import FavoriteButton from '@components/FavoriteButton/FavoriteButton';

import './MovieView.scss';

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
  const { data: movie } = useGetMovieByIdQuery(movieId);

  const favoriteMovies = useAppSelector(
    (state) => state.user.data.favoriteMovies,
  );
  const isFavorite = movie ? favoriteMovies.indexOf(movie?.id) !== -1 : false;

  return (
    <div className="movie-view">
      {isFavorite && <span className="movie-view__favorite-heart" />}
      <img
        className="movie-view__background-image"
        crossOrigin="anonymous"
        src={movie?.posterUrl}
        alt={movie?.title}
      />
      <img
        className="movie-view__image"
        crossOrigin="anonymous"
        src={movie?.posterUrl}
        alt={movie?.title}
      />
      <div className="movie-view__details">
        <h1 className="movie-view__title">{movie?.title}</h1>
        <div className="movie-view__rating">
          Rating: &#9733;
          {movie?.vote_average}
        </div>
        <p className="movie-view__genre">
          Genres:&nbsp;
          {movie?.genreList.map((genreName) => (
            <Link key={genreName} to={`/genres/${genreName}`}>
              {genreName}{' '}
            </Link>
          ))}
        </p>
        <p className="movie-view__director">
          Director:&nbsp;
          {/* <Link to={`/directors/${movie?.director.name}`}>
            {movie?.director.name}
          </Link> */}
        </p>
        <div className="movie-view__description">{movie?.overview}</div>
        <div className="movie-view__button-wrapper">
          <FavoriteButton movieId={movie?.id} showText />
        </div>
      </div>
    </div>
  );
};

export default MovieView;
