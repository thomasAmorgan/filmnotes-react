import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import RollView from "./RollView";
import { withRouter, Route } from "react-router-dom";
import QuickStartScreen from "./QuickStartScreen";
import Modal from "./Modal";

class Main extends Component {
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
      <div style={{ height: '100%' }}>
        <div className={this.state.modal !== null ? "disable" : null} />
        {this.state.modal}
        <div className="App">
          <NavBar />
          <div className="page-content">
            <Route exact path="/rolls" component={QuickStartScreen} />
            <Route path="/rolls/:id" component={RollView} />

          </div>
        </div>
      </div>
    );
  }
}

Main.protoTypes = {
  modalOpen: PropTypes.bool,
  modalMode: PropTypes.object,
  tokenExp: PropTypes.number
};

const mapStateToProps = state => ({
  modalOpen: state.rollsCollection.modalOpen,
  modalMode: state.rollsCollection.modalMode,
});

export default withRouter(connect(mapStateToProps)(Main));