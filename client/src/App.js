import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './bootstrap.min.css';

import Home from './pages/Home';
import Signup from './user/pages/Signup';
import MainHeader from './shared/Navigation/MainHeader';
import Login from './user/pages/Login';
import Newsfeed from './pages/Newsfeed';
import NewPost from './posts/pages/NewPost';

import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [username, setUsername] = useState(false);

  const login = useCallback((uid, token, username) => {
    setToken(token);
    setUserId(uid);
    setUsername(username);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setUsername(null);
  }, []);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path='/posts'>
          <Newsfeed />
        </Route>
        <Route exact path='/posts/new'>
          <NewPost />
        </Route>
        <Redirect to='/posts' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/users/signup'>
          <Signup />
        </Route>
        <Route exact path='/users/login'>
          <Login />
        </Route>
        <Redirect to='/users/login' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        username: username,
        login: login,
        logout: logout,
      }}>
      <Router>
        <MainHeader />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
