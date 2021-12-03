import FilteredMoviesList from '@components/FilteredMoviesList/FilteredMoviesList';

import './GenreView.scss';

interface IGenreViewProps {
  match: {
    params: {
      genreName: string;
    };
  };
}

const GenreView = ({
  match: {
    params: { genreName },
  },
}: IGenreViewProps) => {
  return (
    <div className="genre-view">
      <h1 className="genre-view__name">{genreName} Movies</h1>
      <FilteredMoviesList
        filterFunc={(movie) => movie.genreList.includes(genreName)}
      />
    </div>
  );
};

export default GenreView;
