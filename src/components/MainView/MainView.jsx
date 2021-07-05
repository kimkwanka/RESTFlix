import React, { useEffect, useState } from 'react';

import './MainView.scss';

import LoginView from '../LoginView';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

function showLoadingSpinner() {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  const loadingSpinnerParent = document.querySelector('body');

  loadingSpinnerParent.appendChild(loadingSpinner);
  return loadingSpinner;
}

// Hide a loading spinner
function hideLoadingSpinner(loadingSpinner) {
  loadingSpinner.remove();
}

const MainView = () => {
  const [loggedInUser, setloggedInUser] = useState(null);
  const [jwtToken, setJwtToken] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(async () => {
    if (!loggedInUser) {
      return;
    }

    const loadingSpinner = showLoadingSpinner();

    try {
      const res = await fetch('https://dry-sands-45830.herokuapp.com/movies/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error(err);
    } finally {
      hideLoadingSpinner(loadingSpinner);
    }
  }, [jwtToken]);

  const onLoggedIn = (user, token) => {
    setloggedInUser(user);
    setJwtToken(token);
  };

  if (!loggedInUser) {
    return <LoginView onLoggedIn={onLoggedIn} />;
  }

  if (movies.length === 0) {
    return <div className="main-view" />;
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
