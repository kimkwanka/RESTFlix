import { useEffect } from 'react';

import {
  useLogoutUserMutation,
  useSilentLoginMutation,
} from '@features/slices/api';

import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import NavBar from '@components/NavBar/NavBar';

import Routes from './Routes';

import 'modern-css-reset';

import './App.scss';

const App = () => {
  const [silentLogin, { isUninitialized, isLoading }] =
    useSilentLoginMutation();
  const [logoutUser] = useLogoutUserMutation();

  useEffect(() => {
    // Try logging in silently on initial page load
    silentLogin();

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
          <Routes silentLoginPending={isUninitialized || isLoading} />
        </div>
      </main>
    </>
  );
};

export default App;
