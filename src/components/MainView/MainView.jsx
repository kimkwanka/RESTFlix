/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import './MainView.scss';

import { useStoreContext } from '../Store';
import LoginView from '../LoginView';
import RegistrationView from '../RegistrationView';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

function showLoadingSpinner() {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  const loadingSpinnerParent = document.querySelector('.main-view');

  loadingSpinnerParent.appendChild(loadingSpinner);
  return loadingSpinner;
}

function hideLoadingSpinner(loadingSpinner) {
  loadingSpinner.remove();
}

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [storeState, setStoreState] = useStoreContext();

  const {
    user: loggedInUser, token: jwtToken, errorMessages, route: currentRoute,
  } = storeState;

  const setRoute = (route) => {
    setStoreState({ ...storeState, route, errorMessages: [] });
  };

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

  let content = <div className="main-view" />;

  if (currentRoute === '/') {
    content = (
      <div className="main-view">
        <button type="button" onClick={() => setRoute('/register')}>Sign Up</button>
        <button type="button" onClick={() => setRoute('/login')}>Log in</button>
      </div>
    );
  }

  if (currentRoute === '/login') {
    content = (
      <div className="main-view">
        <LoginView />
        {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
        <button type="button" onClick={() => setRoute('/')}>Back</button>
      </div>
    );
  }

  if (currentRoute === '/register') {
    content = (
      <div className="main-view">
        <RegistrationView onRegister={() => setRoute('/')} onRegisterError={null} />
        {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e.msg || e}</p>)}
        <button type="button" onClick={() => setRoute('/')}>Back</button>
      </div>
    );
  }

  if (currentRoute === '/movies') {
    content = (
      <div className="main-view">
        { selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          : movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          )) }
      </div>
    );
  }

  return (content);
};

export default MainView;
