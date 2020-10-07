import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './bootstrap.min.css';

import Home from './pages/Home';
import Signup from './user/pages/Signup';
import MainHeader from './shared/Navigation/MainHeader';

class App extends React.Component {
  render() {
    return (
      <Router>
        <MainHeader />
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/users/signup'>
          <Signup />
        </Route>
      </Router>
    );
  }
}

export default App;
