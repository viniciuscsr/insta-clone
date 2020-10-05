import React from 'react';

class Jumbotron extends React.Component {
  render() {
    return (
      <header className='bg-primary py-5 mb-5'>
        <div className='container h-100'>
          <div className='row h-100 align-items-center'>
            <div className='col-lg-12'>
              <h1 className='display-4 text-white mt-5 mb-2'>Insta Clone</h1>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Jumbotron;
