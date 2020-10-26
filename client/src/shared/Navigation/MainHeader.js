import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';

import SearchBar from './SearchBar';
import { AuthContext } from '../context/auth-context';

const MainHeader = () => {
  const auth = useContext(AuthContext);

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-secondary'>
      <div className='container'>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'>
            <li className='nav-item active'>
              <NavLink
                activeStyle={{ fontWeight: 'bold' }}
                className='nav-link'
                to='/'>
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/posts/new'>
                New Post
              </Link>
            </li>
          </ul>
          <SearchBar />
          <ul className='navbar-nav ml-auto'>
            {!auth.isLoggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to='/users/login'>
                  Login
                </Link>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to='/users/signup'>
                  Sign Up
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  {auth.username}
                </Link>
              </li>
            )}
            {auth.isLoggedIn && (
              <li className='nav-item'>
                <Link className='nav-link' to=' ' onClick={auth.logout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
