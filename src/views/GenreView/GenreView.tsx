import { useDiscoverMoviesQuery } from '@features/slices/api';

import { useQueryParams } from '@hooks';

import Pagination from '@components/Pagination/Pagination';
import MoviesList from '@components/MoviesList/MoviesList';

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
  const queryParams = useQueryParams();

  const pageAsNumber = parseInt(queryParams.get('page') || '1', 10);

  const { data } = useDiscoverMoviesQuery({
    page: pageAsNumber,
    with_genres: genreId,
  });

  if (!data) {
    return null;
  }

  const { movies, totalPages, genreLookupTable } = data;

  const genreName = genreLookupTable
    ? genreLookupTable[parseInt(genreId, 10)].name
    : '';
  return (
    <>
      <h1 className="genre-heading">{genreName} Movies</h1>
      <Pagination
        baseUrl={`/genres/${genreId}?`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
      <MoviesList movies={movies} />
      <Pagination
        baseUrl={`/genres/${genreId}?`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default GenreView;
