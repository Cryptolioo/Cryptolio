import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from './components/landing';
import { Login } from './components/login';
import { Register } from './components/register';
import Portfolio from './components/portfolio';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' component={Landing} exact/>
            <Route path='/login' component={Login} exact/>
            <Route path='/register' component={Register} exact/>
            <Route path='/portfolio' component={Portfolio} exact/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
