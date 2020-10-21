import React, { Component } from 'react';

class Newsfeed extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {}

  render() {
    return (
      <div className='container post-container w-75 p-3 border rounded'>
        <div className='container title-container'>
          <a href='/posts/<%= post[i]._id %>'>
            <h1>&lt;%= post[i].title %&gt;</h1>
          </a>
          <p>
            By
            <a href='/users/<%= post[i].user._id %>'>
              <span className='font-weight-bold'>
                &lt;%= post[i].user.username %&gt;
              </span>
            </a>
            on
            <span>&lt;%= post[i].date%&gt;</span>
          </p>
        </div>
        <div className='image-container'>
          <a href='/posts/<%= post[i]._id %>'>
            <img src='/<%= post[i].image %>' className='post-image' alt='' />
          </a>
          <p>&lt;%= post[i].caption%&gt;</p>
        </div>
      </div>
    );
  }
}

export default Newsfeed;
