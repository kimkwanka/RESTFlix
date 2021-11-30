import { useAppSelector } from '@features/hooks';

import { TRootState } from '@features/types';

import FilteredMoviesList from '@components/FilteredMoviesList/FilteredMoviesList';

import './GenreView.scss';

interface IGenreViewProps {
  match: {
    params: {
      genreId: string;
    };
  };
}

const GenreView = ({
  match: {
    params: { genreId },
  },
}: IGenreViewProps) => {
  const genres = useAppSelector((state: TRootState) => state.movies.genres);
  const genre = genres[parseInt(genreId, 10)];

  return (
    <div className="genre-view">
      <h1 className="genre-view__name">{genre} Movies</h1>
      <FilteredMoviesList
        filterFunc={(movie) => movie.genre_ids.includes(parseInt(genreId, 10))}
      />
    </div>
  );
};

export default GenreView;
