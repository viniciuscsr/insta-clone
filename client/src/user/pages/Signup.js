import React, { useContext } from 'react';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../shared/context/auth-context';

import './Signup.css';

const SERVER_URL = 'http://localhost:5000';

const Signup = () => {
  const auth = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(SERVER_URL + '/api/users/signup', data);
      auth.login(res.data.userId, res.data.token, res.data.username);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className='form-signin' onSubmit={handleSubmit(onSubmit)}>
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
        className='form-control'
        placeholder='Name'
        ref={register}
        required
        autoFocus
      />
      <label htmlFor='inputEmail' className='sr-only'>
        Username
      </label>
      <input
        name='username'
        type='text'
        className='form-control'
        placeholder='Username'
        ref={register}
        required
        autoFocus
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
        ref={register}
        required
        autoFocus
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
        ref={register}
        required
      />
      <button className='btn btn-lg btn-primary btn-block' type='submit'>
        Sign in
      </button>
    </form>
  );
};

export default Signup;
