import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

import Routes from './Routes';

const App = () => {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
        <header>
          <nav>
            <h1 className="logo">myFlix</h1>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
      ) : null}

      <LoadingSpinner isLoading={isLoading} />
      <Routes />
    </>
  );
};

export default App;
