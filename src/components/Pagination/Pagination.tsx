import { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Pagination.scss';

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
    <div className="pagination-links">
      {initialPage > 1 && (
        <Link to={`${baseUrl}page=${initialPage - 1}`}>&lt; Previous</Link>
      )}
      <input
        className="pagination-input"
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
              history.push(`${baseUrl}page=${currentPage}`);
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
        <Link to={`${baseUrl}page=${initialPage + 1}`}>Next &gt;</Link>
      )}
    </div>
  );
};

export default Pagination;
