import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Route, Redirect, Switch } from "react-router-dom";
import Main from './components/Main';
import LoadingDisplay from "./components/LoadingDisplay";
import LandingPage from "./components/LandingPage";

class App extends Component {
  checkAuth = () => {
    const tokenExp = localStorage.getItem('tokenExp');
    if (tokenExp >= (Date.now().valueOf() / 1000)) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Switch>
        <Route path="/welcome" component={LandingPage} />
        <Route path="/" render={() =>
          this.props.userLoading
            ? <LoadingDisplay />
            : (this.checkAuth() ? <Main /> : <Redirect to="/welcome/login" />)
        } />
      </Switch>
    );
  }
}

App.protoTypes = {
  userLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  userLoading: state.userAuth.userLoading,
});

export default withRouter(connect(mapStateToProps)(App));
