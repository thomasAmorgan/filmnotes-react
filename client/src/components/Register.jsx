import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from '../actions/userActions';

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

  handleRegister = () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.registerUser(user);
    const location = {
      pathname: '/login'
    };
    this.props.history.replace(location);
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
        <button onClick={this.handleRegister}>Register</button>
        <h4>Login after registering.</h4>
      </div>
    )
  }
}

Login.protoTypes = {
  registerUser: PropTypes.func,
};

const mapStateToProps = state => ({
  registerUser: state.userAuth.registerUser,
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Login);
