import React from 'react';

import axios from 'axios';

import './Signup.css';

class Signup extends React.Component {
  render() {
    return (
      <form action='/users/signup' method='POST' className='form-signin'>
        <img
          className='mb-4'
          src='../../public/icons/InstaCloneIcon.png'
          alt=''
          width={72}
          height={72}
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please Sign up</h1>
        <label className='sr-only'>Name</label>
        <input
          name='name'
          type='text'
          id='inputEmail'
          className='form-control'
          placeholder='Name'
          required
          autofocus
        />
        <label htmlFor='inputEmail' className='sr-only'>
          Username
        </label>
        <input
          name='username'
          type='text'
          id='inputEmail'
          className='form-control'
          placeholder='Username'
          required
          autofocus
        />
        <label htmlFor='inputEmail' className='sr-only'>
          Email
        </label>
        <input
          name='email'
          type='email'
          id='inputEmail'
          className='form-control'
          placeholder='Email'
          required
          autofocus
        />
        <label htmlFor='inputPassword' className='sr-only'>
          Password
        </label>
        <input
          name='password'
          type='password'
          id='inputPassword'
          className='form-control'
          placeholder='Password'
          required
        />
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign in
        </button>
      </form>
    );
  }
}

export default Signup;
