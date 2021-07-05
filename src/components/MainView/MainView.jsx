/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import './MainView.scss';

import LoginView from '../LoginView';
import RegistrationView from '../RegistrationView';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

function showLoadingSpinner() {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  const loadingSpinnerParent = document.querySelector('body');

  loadingSpinnerParent.appendChild(loadingSpinner);
  return loadingSpinner;
}

function hideLoadingSpinner(loadingSpinner) {
  loadingSpinner.remove();
}

const MainView = () => {
  const [route, setRoute] = useState('/');
  const [errors, setErrors] = useState([]);
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
    setRoute('/movies');
  };

  const onError = (newErrors) => {
    setErrors(newErrors);
  };

  let content = <div className="main-view" />;

  if (route === '/') {
    content = (
      <div className="main-view">
        <button type="button" onClick={() => setRoute('/register')}>Sign Up</button>
        <button type="button" onClick={() => setRoute('/login')}>Log in</button>
      </div>
    );
  }

  if (route === '/login') {
    content = (
      <div className="main-view">
        <LoginView onLoggedIn={onLoggedIn} onLoginError={onError} />
        {errors.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
        <button type="button" onClick={() => setRoute('/')}>Back</button>
      </div>
    );
  }

  if (route === '/register') {
    content = (
      <div className="main-view">
        <RegistrationView onRegister={() => setRoute('/')} onRegisterError={onError} />
        {errors.map((e, i) => <p className="errorText" key={`err${i}`}>{e.msg || e}</p>)}
        <button type="button" onClick={() => setRoute('/')}>Back</button>
      </div>
    );
  }

  if (route === '/movies') {
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
