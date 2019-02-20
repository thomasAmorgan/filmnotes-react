import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DynamicForm from "./DynamicForm";
import DeleteDialog from "./DeleteDialog";
import LoadingDisplay from "./LoadingDisplay";

class Modal extends Component {
  render() {
    return (
      <div className="modal">
        {
          this.props.modalLoading ?
            <LoadingDisplay />
            :
            this.props.modalMode.deleting ?
              <DeleteDialog />
              :
              <DynamicForm />
        }
      </div>
    );
  }
}

Modal.protoTypes = {
  modalMode: PropTypes.object,
  modalLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  modalLoading: state.rollsCollection.modalLoading
});

export default connect(mapStateToProps)(Modal);