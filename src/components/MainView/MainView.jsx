import React, { useState } from 'react';

import './MainView.scss';

import MovieCard from '../MovieCard/MovieCard';

const MainView = () => {
  const [movies] = useState([
    {
      _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...',
    },
    {
      _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...',
    },
    {
      _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...',
    },
  ]);
  if (movies.length === 0) {
    return <div className="main-view">The list is empty!</div>;
  }
  return (
    <div className="main-view">
      {movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)}
    </div>
  );
};

export default MainView;
