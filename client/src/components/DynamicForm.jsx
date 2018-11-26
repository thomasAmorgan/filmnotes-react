import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExposure,
  toggleModal,
  setModalMode,
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

    // check if editing
    // call func to update rather than add
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
    this.props.setModalMode({ mode: "", editing: false });
    this.setState({});
    this.props.toggleModal();
  };

  // need to be changed to prefill the state instead of form, because data is uneditable in current form
  preFillForm = (form, objectData) => {
    // check for tags so it populates correctly, spaces vs commas
    let newForm = form.map(x => ({ ...x }));

    newForm.forEach(input => {
      for (let stat in objectData) {
        if (input.key === stat) {
          input.value = objectData[stat];
        }
      }
    });

    return newForm;
  };

  preFillState = (form, objectData) => {
    form.forEach(input => {
      for (let stat in objectData) {
        if (input.key === stat) {
          this.setState({
            [stat]: objectData[stat]
          });
        }
      }
    });
  };

  componentDidMount() {
    let currentRoll = this.props.currentRoll;
    let rollForm = this.props.rollForm;

    // create current exposure state, create setCurrentExposure
    let currentExposure = this.props.currentExposure;
    let exposureForm = this.props.exposureForm;

    if (this.props.modalMode.mode === "roll") {
      if (this.props.modalMode.editing) {
        this.preFillState(rollForm, currentRoll);
      }
    } else if (this.props.modalMode.mode === "exposure") {
      if (this.props.modalMode.editing) {
        this.preFillState(exposureForm, currentExposure);
      }
    }
  }

  renderForm = () => {
    let model = [];
    let currentRoll = this.props.currentRoll;
    let rollForm = this.props.rollForm;

    // create current exposure state, create setCurrentExposure
    let currentExposure = this.props.currentExposure;
    let exposureForm = this.props.exposureForm;

    // check if editing
    // call function to prefill form
    if (this.props.modalMode.mode === "roll") {
      if (this.props.modalMode.editing) {
        model = this.preFillForm(rollForm, currentRoll);
      } else {
        model = rollForm;
      }
    } else if (this.props.modalMode.mode === "exposure") {
      if (this.props.modalMode.editing) {
        model = this.preFillForm(exposureForm, currentExposure);
      } else {
        model = exposureForm;
      }
    }

    let formUI = model.map(input => {
      let key = input.key;
      let type = input.type || "text";
      let placeholder = input.placeholder || "";
      let props = input.props || {};
      let value = input.value;

      let inputElement = (
        <input
          key={key}
          className="text-input"
          type={type}
          placeholder={placeholder}
          {...props}
          defaultValue={value}
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
              defaultValue={value}
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
  setModalMode: PropTypes.func,
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
  setModalMode: state.rollsCollection.setModalMode,
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
  { addExposure, toggleModal, setCurrentRoll, addRoll, setModalMode }
)(DynamicForm);
