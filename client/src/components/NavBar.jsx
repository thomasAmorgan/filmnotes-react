import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import roll from "../assests/icons/pngs/roll.png";
import { Switch, Route } from "react-router";
import RollList from "./RollList";

export default class NavBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="navlinks">
          <NavLink
            to="/rolls"
            className="navbar-link"
            activeClassName="navbar-link-active"
          >
            <img src={roll} alt="" />
          </NavLink>
        </div>
        <div className="sidebar-content">
          <Switch>
            <Route exact path="/rolls" component={RollList} />
          </Switch>
        </div>
      </div>
    );
  }
}
