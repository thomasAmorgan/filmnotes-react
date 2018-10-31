import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./components/NavBar";
import RollView from "./components/RollView";
import { withRouter } from "react-router-dom";

class App extends Component {
  state = {
    display: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.rollSelected !== prevProps.rollSelected) {
      this.setState({ display: <RollView /> });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="page-content">{this.state.display}</div>
      </div>
    );
  }
}

RollView.protoTypes = {
  rollSelected: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  rollSelected: state.rollsCollection.rollSelected
});

export default withRouter(connect(mapStateToProps)(App));
