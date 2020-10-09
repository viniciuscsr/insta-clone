import React from 'react';

import axios from 'axios';

import './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      username: '',
      email: '',
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
        <h1 className='h3 mb-3 font-weight-normal'>Please Sign up</h1>
        <label className='sr-only'>Name</label>
        <input
          name='name'
          type='text'
          className='form-control'
          placeholder='Name'
          value={this.state.name}
          onChange={this.handleChange}
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
          value={this.state.username}
          onChange={this.handleChange}
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
          value={this.state.email}
          onChange={this.handleChange}
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

export default Signup;
