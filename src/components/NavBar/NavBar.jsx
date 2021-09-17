import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { logoutUser } from '../../redux';

import './NavBar.scss';

const NavBar = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    isLoggedIn ? (
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
            <a href="/logout" onClick={() => dispatch(logoutUser())}>Logout</a>
          </li>
        </ul>
      </nav>
    ) : null
  );
};

export default NavBar;
