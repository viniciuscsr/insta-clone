import React, { Component } from 'react';

import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  onSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/posts',
      this.state
    );
    console.log(res);
  };

  render() {
    return (
      <form className='form-signin' onSubmit={this.onSubmit}>
        <img
          className='mb-4'
          src='../../public/icons/InstaCloneIcon.png'
          alt=''
          width={72}
          height={72}
        />
        <h1 className='h3 mb-3 font-weight-normal'>Please Log in</h1>
        <label htmlFor='inputEmail' className='sr-only'>
          Username
        </label>
        <input
          name='username'
          type='text'
          className='form-control'
          placeholder='Username'
          value={this.state.username}
          onChange={this.handleChange}
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
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button className='btn btn-lg btn-primary btn-block' type='submit'>
          Sign in
        </button>
      </form>
    );
  }
}

export default Login;
