/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './MainView.scss';

import { useStoreContext } from '../Store';
import LoginView from '../LoginView';
import RegistrationView from '../RegistrationView';
import MovieCard from '../MovieCard';
import MovieView from '../MovieView';

const showLoadingSpinner = () => {
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';

  const loadingSpinnerParent = document.querySelector('.main-view');

  loadingSpinnerParent.appendChild(loadingSpinner);
  return loadingSpinner;
};

const hideLoadingSpinner = (loadingSpinner) => {
  loadingSpinner.remove();
};

const ErrorMessages = () => {
  const [{ errorMessages }] = useStoreContext();

  return (
    <Row className="m-4">
      <Col>
        {errorMessages.map((e, i) => <p className="errorText" key={`err${i}`}>{e}</p>)}
      </Col>
    </Row>
  );
};

const MovieList = ({ movies, setSelectedMovie }) => {
  const handleClick = (myMovie) => React.useCallback(() => setSelectedMovie(myMovie), [myMovie]);

  return (
    movies.map((movie) => (
      <Col className="mb-4" md={4}>
        <MovieCard key={movie._id} movie={movie} onClick={handleClick(movie)} />
      </Col>
    ))
  );
};

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [storeState, setStoreState] = useStoreContext();

  const {
    user: loggedInUser, token: jwtToken, route: currentRoute,
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
      <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
        <Button className="mb-3" onClick={() => setRoute('/register')}>Sign Up</Button>
        <Button onClick={() => setRoute('/login')}>Log in</Button>
      </Col>
    );
  }

  if (currentRoute === '/login') {
    content = (
      <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
        <LoginView />
        <ErrorMessages />
        <Button variant="secondary" className="mt-4" onClick={() => setRoute('/')}>Back</Button>
      </Col>
    );
  }

  if (currentRoute === '/register') {
    content = (
      <Col className="d-flex flex-column justify-content-center align-items-center" md={3}>
        <RegistrationView />
        <ErrorMessages />
        <Button variant="secondary" className="mt-4" onClick={() => setRoute('/')}>Back</Button>
      </Col>
    );
  }

  if (currentRoute === '/movies') {
    content = (
      <>
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </Col>
          )
          : <MovieList movies={movies} setSelectedMovie={setSelectedMovie} />}
      </>
    );
  }

  return (
    <Container>
      <Row className="main-view m-3 justify-content-md-center">
        {content}
      </Row>
    </Container>
  );
};

export default MainView;
