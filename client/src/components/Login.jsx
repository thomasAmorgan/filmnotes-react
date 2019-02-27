import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { authenticateUser } from '../actions/userActions';

class Login extends Component {
  state = {
    email: null,
    password: null
  };

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  };

  handlePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleLogin = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.authenticateUser(user);
    this.props.history.replace({ pathname: '/' });
  };

  render() {
    return (
      <div className="login-register">
        <form>
          <input
            type="email"
            placeholder="Email..."
            onChange={this.handleEmail}
          />
          <input
            type="password"
            placeholder="Password..."
            onChange={this.handlePassword}
          />
        </form>
        <button onClick={this.handleLogin}>Login</button>
        {/* <div>
          {!!this.props.authErrorMessage
            ? JSON.stringify(this.props.authErrorMessage.response.data.message)
            : null
          }
        </div> */}
      </div>
    )
  }
}

Login.protoTypes = {
  authenticateUser: PropTypes.func,
  authErrorMessage: PropTypes.object
};

const mapStateToProps = state => ({
  authenticateUser: state.userAuth.authenticateUser,
  authErrorMessage: state.userAuth.authErrorMessage
});

export default withRouter(connect(
  mapStateToProps,
  { authenticateUser }
)(Login));
