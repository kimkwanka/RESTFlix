import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { logoutUser } from '../../redux';

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
        <ul>
          <li>
            <NavLink className="navbar-link" activeClassName="navbar-link__active" to="/" exact>Home</NavLink>
          </li>
          <li>
            <NavLink className="navbar-link" activeClassName="navbar-link__active" to="/profile">Profile</NavLink>
          </li>
          <li>
            <a className="navbar-link" href="/logout" onClick={handleLogoutClick}>
              Logout
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
