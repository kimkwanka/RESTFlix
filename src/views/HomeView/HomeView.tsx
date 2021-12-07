import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDiscoverMoviesQuery } from '@features/slices/api';

import { useQueryParams } from '@hooks';

import MovieCard from '@components/MovieCard/MovieCard';

import './HomeView.scss';

interface IPaginationProps {
  initialPage: number;
  totalPages: number;
}

const Pagination = ({ initialPage, totalPages }: IPaginationProps) => {
  const history = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  return (
    <div className="home-pagination-links">
      {initialPage > 1 && (
        <Link to={`/?page=${initialPage - 1}`}>&lt; Previous</Link>
      )}
      <input
        className="home-pagination-input"
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
              history.push(`/?page=${currentPage}`);
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
        <Link to={`/?page=${initialPage + 1}`}>Next &gt;</Link>
      )}
    </div>
  );
};

const HomeView = () => {
  const queryParams = useQueryParams();

  const pageAsNumber = parseInt(queryParams.get('page') || '1', 10);

  const { data } = useDiscoverMoviesQuery(pageAsNumber);

  if (!data) {
    return null;
  }

  const { movies, totalPages } = data;

  return (
    <>
      <Pagination initialPage={pageAsNumber} totalPages={totalPages} />
      <div className="home-movies-list">
        {movies?.map((movie) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
      <Pagination initialPage={pageAsNumber} totalPages={totalPages} />
    </>
  );
};

export default HomeView;
