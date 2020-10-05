import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './assets/stylesheets/bootstrap.min.css';
import './assets/stylesheets/app.css';

import Home from './pages/Home';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/'>
          <Home />
        </Route>
      </Router>
    );
  }
}

export default App;
