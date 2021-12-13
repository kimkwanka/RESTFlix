import { useDiscoverMoviesQuery } from '#state/slices/api';

import { useQueryParams } from '#hooks';

import Pagination from '#components/Pagination/Pagination';
import MoviesList from '#components/MoviesList/MoviesList';

import './HomeView.scss';

const HomeView = () => {
  const queryParams = useQueryParams();

  const pageAsNumber = parseInt(queryParams.get('page') || '1', 10);

  const { data } = useDiscoverMoviesQuery({ page: pageAsNumber });

  if (!data) {
    return null;
  }

  const { movies, totalPages } = data;

  return (
    <>
      <Pagination
        baseUrl="/?"
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
      <MoviesList movies={movies} />
      <Pagination
        baseUrl="/?"
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default HomeView;
