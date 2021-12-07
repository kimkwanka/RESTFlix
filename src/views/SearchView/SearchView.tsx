import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useSearchMoviesQuery } from '@features/slices/api';

import { useQueryParams } from '@hooks';

import MovieCard from '@components/MovieCard/MovieCard';

import './SearchView.scss';

interface IPaginationProps {
  baseUrl: string;
  initialPage: number;
  totalPages: number;
}

const Pagination = ({ baseUrl, initialPage, totalPages }: IPaginationProps) => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return (
    <div className="search-pagination-links">
      {initialPage > 1 && (
        <Link to={`${baseUrl}&page=${initialPage - 1}`}>&lt; Previous</Link>
      )}
      <input
        className="search-pagination-input"
        type="number"
        value={currentPage}
        onChange={(e) => {
          if (inputRef?.current?.reportValidity()) {
            setCurrentPage(parseInt(e.currentTarget.value, 10));
          }
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            if (inputRef?.current?.reportValidity()) {
              history.push(`${baseUrl}&page=${currentPage}`);
            }
          }
        }}
        min={1}
        max={totalPages}
        required
        ref={inputRef}
      />
      <p>of {totalPages}</p>
      {initialPage < totalPages && (
        <Link to={`${baseUrl}&page=${initialPage + 1}`}>Next &gt;</Link>
      )}
    </div>
  );
};

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
      <h2 className="search-heading">
        Search results for: &apos;{searchQuery}&apos;
      </h2>
      <h3 className="search-heading">({totalResults} total results)</h3>
      <Pagination
        baseUrl={`/search?query=${searchQuery}`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
      <div className="search-movies-list">
        {movies?.map((movie) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
      <Pagination
        baseUrl={`/search?query=${searchQuery}`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default SearchView;
