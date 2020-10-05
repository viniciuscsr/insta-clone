import React from 'react';

class HomeCard extends React.Component {
  render() {
    return (
      <div className='col-md-4 mb-5'>
        <div className='card h-100'>
          <img
            className='card-img-top'
            src='./assets/images/follow.jpg'
            alt=''
          />
          <div className='card-body'>
            <h4 className='card-title'>{this.props.heading}</h4>
            <p className='card-text'>{this.props.caption}</p>
          </div>
          <div className='card-footer'>
            <a href='#' className='btn btn-primary'>
              Find Out More!
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeCard;
