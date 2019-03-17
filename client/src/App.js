import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';

import Home from './pages/Home';
import Join from './pages/Join';
import Login from './pages/Login';
import MyPage from './pages/MyPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div style={{padding:'30px'}}>
          <NavBar />
          <div style={{marginTop:'40px'}}>
            <Route exact path='/' component={Home} />
            <Route path='/join' component={Join} />
            <Route path='/login' component={Login} />
            <Route path='/mypage' component={MyPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
