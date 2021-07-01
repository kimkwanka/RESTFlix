import React, { useState } from 'react';

import './MainView.scss';

import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

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
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (movies.length === 0) {
    return <div className="main-view">The list is empty!</div>;
  }

  return (
    <div className="main-view">
      { selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        : movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
        )) }
    </div>
  );
};

export default MainView;
