import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Landing } from './components/landing';
import { Login } from './components/login';
import { Register } from './components/register';
import { Portfolio } from './components/portfolio';
import {ForgotPassword} from './components/forgotPassword';
import {Calculator} from './components/calculator';
import { ResetPassword } from './components/resetPassword';
import {ContactUs} from './components/contactUs';
import {Profile} from './components/profile';

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
            <Route path='/forgotPassword' component={ForgotPassword} exact/>
            <Route path='/calculator' component={Calculator} exact/>
            <Route path='/resetPassword/:token' component={ResetPassword} exact/>
            <Route path='/contact-us' component={ContactUs} exact/>
            <Route path='/profile' component={Profile} exact/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
