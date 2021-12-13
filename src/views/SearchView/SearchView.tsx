import { useSearchMoviesQuery } from '#state/slices/api';

import { useQueryParams } from '#hooks';

import Pagination from '#components/Pagination/Pagination';
import MoviesList from '#components/MoviesList/MoviesList';

import './SearchView.scss';

const SearchView = () => {
  const queryParams = useQueryParams();

  const pageAsNumber = parseInt(queryParams.get('page') || '1', 10);
  const searchQuery = queryParams.get('query') || '';

  const { data } = useSearchMoviesQuery({
    query: searchQuery,
    page: pageAsNumber,
  });

  if (!data) {
    return null;
  }

  const { movies, totalPages, totalResults } = data;

  return (
    <>
      <h1 className="search-heading">
        Search results for: &apos;{searchQuery}&apos;
      </h1>
      <h3 className="search-heading">({totalResults} total results)</h3>
      <Pagination
        baseUrl={`/search?query=${searchQuery}&`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
      <MoviesList movies={movies} />
      <Pagination
        baseUrl={`/search?query=${searchQuery}&`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default SearchView;
