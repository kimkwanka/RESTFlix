import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDiscoverMoviesQuery } from '@features/slices/api';

import { useQueryParams } from '@hooks';

import MovieCard from '@components/MovieCard/MovieCard';

import './GenreView.scss';

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
        <Link to={`${baseUrl}?page=${initialPage - 1}`}>&lt; Previous</Link>
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
              history.push(`${baseUrl}?page=${currentPage}`);
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
        <Link to={`${baseUrl}?page=${initialPage + 1}`}>Next &gt;</Link>
      )}
    </div>
  );
};

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
        baseUrl={`/genres/${genreId}`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
      <div className="genre-movies-list">
        {movies?.map((movie) => (
          <MovieCard key={`${movie.id}`} movie={movie} />
        ))}
      </div>
      <Pagination
        baseUrl={`/genres/${genreId}`}
        initialPage={pageAsNumber}
        totalPages={totalPages}
      />
    </>
  );
};

export default GenreView;
