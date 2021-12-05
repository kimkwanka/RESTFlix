import { MouseEvent } from 'react';

import { NavLink } from 'react-router-dom';

import { useLogoutUserMutation } from '@features/slices/api';

import { useAppSelector } from '@features/hooks';

import SearchBar from './SearchBar/SearchBar';

import './NavBar.scss';

const NavBar = () => {
  const [logoutUser] = useLogoutUserMutation();

  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const handleLogoutClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logoutUser();

    // Set 'logout' item in local storage to trigger logout in other tabs via storage event listerner in App.tsx
    localStorage.setItem('logout', JSON.stringify(Date.now()));
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        <span>REST</span>
        Flix
      </h1>
      {isLoggedIn && (
        <>
          <SearchBar />
          <ul>
            <li>
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/"
                exact
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="navbar__link"
                activeClassName="navbar__link--active"
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <a
                className="button clear logout-button"
                href="/logout"
                onClick={handleLogoutClick}
              >
                Sign Out
              </a>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default NavBar;
