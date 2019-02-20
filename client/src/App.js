import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./components/NavBar";
import RollView from "./components/RollView";
import { withRouter, Route } from "react-router-dom";
import QuickStartScreen from "./components/QuickStartScreen";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    modal: null
  };

  componentDidUpdate(prevProps) {
    if (this.props.modalOpen !== prevProps.modalOpen) {
      if (this.props.modalOpen) {
        this.setState({ modal: <Modal /> });
      } else {
        this.setState({ modal: null });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="page-content">
          <Route exact path="/rolls" component={QuickStartScreen} />
          <Route path="/rolls/:id" component={RollView} />
          {this.state.modal}
        </div>
      </div>
    );
  }
}

RollView.protoTypes = {
  modalOpen: PropTypes.bool,
  modalMode: PropTypes.object
};

const mapStateToProps = state => ({
  modalOpen: state.rollsCollection.modalOpen,
  modalMode: state.rollsCollection.modalMode
});

export default withRouter(connect(mapStateToProps)(App));
