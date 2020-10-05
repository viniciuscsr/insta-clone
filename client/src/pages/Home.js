import React from 'react';

import Jumbotron from '../shared/UIElements/Jumbotron';
import Card from '../shared/UIElements/Card';
import HomePageContent from '../shared/UIElements/HomePageContent';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron />
        <div className='container'>
          <HomePageContent />
          <div className='row'>
            <Card
              heading={'Post Photos'}
              caption={
                "Your photos will come up on your profile and on your friends' newsfeed."
              }
            />
            <Card
              heading={'Leave Comments'}
              caption={'Leave comments on photos.'}
            />
            <Card
              heading={'Follow your friends'}
              caption={'Follow your friends and get updates on your newsfeed.'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
