import { useGetGenresQuery } from '@features/slices/api';

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
  const { data: genreList } = useGetGenresQuery();
  const genre = genreList?.[parseInt(genreId, 10)];

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
