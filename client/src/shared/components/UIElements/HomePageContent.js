import React from 'react';

class HomePageContent extends React.Component {
  render() {
    return (
      <div className='row'>
        <div className='col-md-12 mb-5'>
          <h2>What We Do</h2>
          <hr />
          <p>
            Insta Clone is an simplified version of Instagram where users can
            post pictures, leave comments and communicate with their friends.
          </p>
          <a className='btn btn-primary btn-lg' href='users/login'>
            Get Started »
          </a>
        </div>
      </div>
    );
  }
}

export default HomePageContent;
