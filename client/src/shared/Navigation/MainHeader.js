import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import SearchBar from './SearchBar';

class MainHeader extends React.Component {
  render() {
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
              <li className='nav-item'>
                <Link className='nav-link' to='/users/login'>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/users/signup'>
                  Sign Up
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  currentUser.username
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/users/logout'>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default MainHeader;
