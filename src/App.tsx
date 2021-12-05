import { useEffect } from 'react';

import { useLogoutUserMutation } from '@features/slices/api';

import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import NavBar from '@components/NavBar/NavBar';

import Routes from './Routes';

import 'modern-css-reset';

import './App.scss';

const App = () => {
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    // If 'logout' item is set it means another tab logged out, so we log out as well
    const syncLogout = (e: StorageEvent) => {
      if (e.key === 'logout') {
        logoutUser();
      }
    };
    window.addEventListener('storage', syncLogout);

    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, []);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <div className="container">
          <LoadingSpinner />
          <Routes />
        </div>
      </main>
    </>
  );
};

export default App;
