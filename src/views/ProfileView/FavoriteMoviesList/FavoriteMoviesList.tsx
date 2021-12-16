import { useGetManyMoviesByIdQuery } from '#redux/slices/api';
import { useAppSelector } from '#redux/hooks';

import MovieCard from '#components/MovieCard/MovieCard';

import './FavoriteMoviesList.scss';

const FavoriteMoviesList = () => {
  const favoriteMovies = useAppSelector(
    (state) => state.user.data.favoriteMovies,
  );

  const { data: movies } = useGetManyMoviesByIdQuery(favoriteMovies);

  if (!movies) {
    return null;
  }

  return (
    <div className="favorite-movies-list">
      {movies?.map((movie) => (
        <MovieCard key={`${movie.id}`} movie={movie} />
      ))}
    </div>
  );
};

export default FavoriteMoviesList;
