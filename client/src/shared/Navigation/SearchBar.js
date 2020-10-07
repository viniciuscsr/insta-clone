import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <ul className='navbar nav ml-md-auto'>
        <form
          className='form-inline my-2 my-lg-0'
          method='GET'
          action='/search'>
          <input
            className='form-control mr-sm-2'
            type='text'
            placeholder='Search for Users'
            aria-label='Search'
            name='q'
          />
          <button className='btn btn-success my-2 my-sm-0' type='submit'>
            Search
          </button>
        </form>
      </ul>
    );
  }
}

export default SearchBar;
