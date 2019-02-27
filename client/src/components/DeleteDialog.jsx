import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { toggleModal, setModalMode, deleteExposure, deleteRoll } from "../actions/rollActions";

class DeleteDialog extends Component {
  handleClose = () => {
    this.props.setModalMode({
      mode: "",
      editing: false,
      deleting: false
    });
    this.props.toggleModal();
  }

  render() {
    return (
      <div className="delete-dialog">
        {this.props.modalMode.mode === 'exposure' ?
          <div>
            <h2>Delete Exposure?</h2>
            <div className="text">Are you sure you want to delete this exposure?</div>
            <div className="confirm-buttons">
              <button
                className="green"
                onClick={() => {
                  this.props.deleteExposure(this.props.currentRoll._id, this.props.currentExposure._id);
                  this.handleClose();
                }}
              >
                Yes
              </button>
              <button onClick={this.handleClose} className="red">No</button>
            </div>
          </div>
          :
          <div>
            <h2>Delete Roll?</h2>
            <div className="text">Are you sure you want to delete this roll?</div>
            <div className="confirm-buttons">
              <button
                className="green"
                onClick={() => {
                  this.props.deleteRoll(this.props.currentRoll._id);
                  this.handleClose();
                  this.props.history.replace({ pathname: '/rolls' });
                }}
              >
                Yes
              </button>
              <button className="red" onClick={this.handleClose}>No</button>
            </div>
          </div>
        }
      </div>
    )
  }
}

DeleteDialog.protoTypes = {
  modalMode: PropTypes.object,
  toggleModal: PropTypes.func,
  setModalMode: PropTypes.func,
  deleteExposure: PropTypes.func,
  deleteRoll: PropTypes.func,
  currentExposure: PropTypes.object,
  currentRoll: PropTypes.object,
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  toggleModal: state.rollsCollection.toggleModal,
  setModalMode: state.rollsCollection.setModalMode,
  deleteExposure: state.rollsCollection.deleteExposure,
  deleteRoll: state.rollsCollection.deleteRoll,
  currentExposure: state.rollsCollection.currentExposure,
  currentRoll: state.rollsCollection.currentRoll,
});

export default withRouter(connect(
  mapStateToProps,
  { toggleModal, setModalMode, deleteExposure, deleteRoll }
)(DeleteDialog));