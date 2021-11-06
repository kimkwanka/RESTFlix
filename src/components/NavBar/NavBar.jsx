import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../features';

import SearchBar from './SearchBar/SearchBar';

import './NavBar.scss';

const NavBar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleLogoutClick = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <nav className="navbar">
      <h1 className="logo">
        <span>my</span>
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
