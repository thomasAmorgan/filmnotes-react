import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RollForm from "./RollForm";
import ExposureForm from "./ExposureForm";

class Modal extends Component {
  state = {
    modalForm: ""
  };

  handleForm = () => {
    switch (this.props.modalMode.mode) {
      case "roll":
        this.setState({
          modalForm: <RollForm />
        });
        break;

      case "exposure":
        this.setState({
          modalForm: <ExposureForm />
        });
        break;

      default:
        break;
    }
  };

  componentDidMount() {
    this.handleForm();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalMode !== prevProps.modalMode) {
      this.handleForm();
    }
  }

  render() {
    console.log(this.props.modalMode);

    return <div className="modal">{this.state.modalForm}</div>;
  }
}

Modal.protoTypes = {
  modalMode: PropTypes.object
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode
});

export default connect(mapStateToProps)(Modal);
