import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExposure,
  toggleModal,
  setCurrentRoll,
  addRoll
} from "../actions/rollActions";

class DynamicForm extends Component {
  state = {};

  handleChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.props.modalMode.mode === "roll") {
      let newRoll = {
        ...this.state,
        tags: this.state.tags.split(" ")
      };
      this.props.addRoll(newRoll);
    } else {
      let newExposure = {
        ...this.state
      };
      this.props.addExposure(this.props.currentRoll._id, newExposure);
      this.props.setCurrentRoll(this.props.currentRoll._id);
    }

    this.setState({});
    this.props.toggleModal();
  };

  handleDiscard = e => {
    e.preventDefault();
    this.props.toggleModal();
  };

  renderForm = () => {
    let model = [];

    if (this.props.modalMode.mode === "roll") {
      model = this.props.rollForm;
    } else {
      model = this.props.exposureForm;
    }

    let formUI = model.map(input => {
      let key = input.key;
      let type = input.type || "text";
      let placeholder = input.placeholder || "";
      let props = input.props || {};

      let inputElement = (
        <input
          key={key}
          className="text-input"
          type={type}
          placeholder={placeholder}
          {...props}
          onChange={e => this.handleChange(e, key)}
        />
      );

      if (type === "textarea") {
        inputElement = (
          <div className="form-description" key={key}>
            <textarea
              className="textarea-input"
              placeholder={placeholder}
              {...props}
              onChange={e => this.handleChange(e, key)}
            />
          </div>
        );
      }

      return inputElement;
    });

    return formUI;
  };

  capitalizeString = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    let formTitle = this.capitalizeString(this.props.modalMode.mode);

    return (
      <div className="roll-form">
        <div className="roll-form-title">{`New ${formTitle}`}</div>
        <form id="roll-form" onSubmit={this.handleSubmit}>
          {this.renderForm()}
          <div className="roll-form-buttons">
            <button className="red" onClick={this.handleDiscard}>
              Discard
            </button>
            <button className="green" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

DynamicForm.protoTypes = {
  modalMode: PropTypes.object,
  addExposure: PropTypes.func,
  addRoll: PropTypes.func,
  toggleModal: PropTypes.func,
  currentRoll: PropTypes.object,
  setCurrentRoll: PropTypes.func,
  exposureForm: PropTypes.array.isRequired,
  rollForm: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  addExposure: state.rollsCollection.addExposure,
  addRoll: state.rollsCollection.addRoll,
  toggleModal: state.rollsCollection.toggleModal,
  currentRoll: state.rollsCollection.currentRoll,
  setCurrentRoll: state.rollsCollection.setCurrentRoll,
  exposureForm: state.rollsCollection.exposureForm,
  rollForm: state.rollsCollection.rollForm
});

export default connect(
  mapStateToProps,
  { addExposure, toggleModal, setCurrentRoll, addRoll }
)(DynamicForm);
