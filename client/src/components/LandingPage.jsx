import React, { Component } from 'react';
import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Logo from '../assests/icons/logo.svg';

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="heading">
          <h1>FilmNotes</h1>
          <img src={Logo} alt="filmnotes logo" className="logo" />
          <h4>Welcome to FilmNotes, please log in or register to get started.</h4>
        </div>
        <div className="option-buttons">
          <NavLink to="/welcome/login" className="btn">Login</NavLink>
          <NavLink to="/welcome/register" className="btn">Register</NavLink>
        </div>
        <Switch>
          <Route path="/welcome/login" component={Login} />
          <Route path="/welcome/register" component={Register} />
        </Switch>
      </div>
    );
  }
}
