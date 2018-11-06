import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./components/NavBar";
import RollView from "./components/RollView";
import { withRouter } from "react-router-dom";
import QuickStartScreen from "./components/QuickStartScreen";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    display: <QuickStartScreen />,
    modal: ""
  };

  componentDidUpdate(prevProps) {
    if (this.props.rollSelected !== prevProps.rollSelected) {
      this.setState({ display: <RollView /> });
    }
    if (this.props.modalOpen !== prevProps.modalOpen) {
      if (this.props.modalOpen) {
        this.setState({ modal: <Modal /> });
      } else {
        this.setState({ modal: "" });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <div className="page-content">
          {this.state.display}
          {this.state.modal}
        </div>
      </div>
    );
  }
}

RollView.protoTypes = {
  rollSelected: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool,
  modalMode: PropTypes.object
};

const mapStateToProps = state => ({
  rollSelected: state.rollsCollection.rollSelected,
  modalOpen: state.rollsCollection.modalOpen,
  modalMode: state.rollsCollection.modalMode
});

export default withRouter(connect(mapStateToProps)(App));
