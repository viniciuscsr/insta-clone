import React from 'react';

import Card from '../shared/components/UIElements/ImageCard';
import Jumbotron from '../shared/components/UIElements/Jumbotron';
import HomePageContent from '../shared/components/UIElements/HomePageContent';

const Home = () => {
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
};

export default Home;
