import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './bootstrap.min.css';

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
