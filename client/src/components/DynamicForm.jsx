import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExposure,
  toggleModal,
  setModalMode,
  addRoll,
  updateRoll,
  updateExposure
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
      let convertedTags;
      if (typeof (this.state.tags) === 'string') {
        convertedTags = this.state.tags.split(" ");
      } else {
        convertedTags = this.state.tags;
      }

      let newRoll = {
        ...this.state,
        tags: convertedTags
      };

      if (this.props.modalMode.editing) {
        this.props.updateRoll(this.props.currentRoll._id, newRoll);
      } else {
        this.props.addRoll(newRoll);
      }
    } else {
      let newExposure = {
        ...this.state
      };

      if (this.props.modalMode.editing) {
        this.props.updateExposure(this.props.currentRoll._id, this.props.currentExposure._id, newExposure);
      } else {
        this.props.addExposure(this.props.currentRoll._id, newExposure);
      }
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

  preFillForm = (form, objectData) => {
    let newForm = form.map(x => ({ ...x }));

    newForm.forEach(input => {
      for (let stat in objectData) {
        // check for tags so it populates correctly, spaces vs commas
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
    if (this.props.modalMode.mode === 'roll' && this.props.modalMode.editing) {
      this.preFillState(this.props.rollForm, this.props.currentRoll);
    }
    if (this.props.modalMode.mode === 'exposure' && this.props.modalMode.editing) {
      this.preFillState(this.props.exposureForm, this.props.currentExposure);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      if (this.props.modalMode.mode === 'roll' && this.props.modalMode.editing) {
        this.preFillState(this.props.rollForm, this.props.currentRoll);
      }
      if (this.props.modalMode.mode === 'exposure' && this.props.modalMode.editing) {
        this.preFillState(this.props.exposureForm, this.props.currentExposure);
      }
    }
  }

  renderForm = () => {
    let model = [];
    let currentRoll = this.props.currentRoll;
    let rollForm = this.props.rollForm;

    let currentExposure = this.props.currentExposure;
    let exposureForm = this.props.exposureForm;

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
        <div className="roll-form-title">
          {this.props.modalMode.editing ? `Edit ${formTitle}` : `New ${formTitle}`}
        </div>
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
  updateRoll: PropTypes.func,
  updateExposure: PropTypes.func,
  toggleModal: PropTypes.func,
  currentRoll: PropTypes.object,
  exposureForm: PropTypes.array.isRequired,
  rollForm: PropTypes.array.isRequired,
  currentExposure: PropTypes.object,
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  setModalMode: state.rollsCollection.setModalMode,
  addExposure: state.rollsCollection.addExposure,
  addRoll: state.rollsCollection.addRoll,
  updateRoll: state.rollsCollection.updateRoll,
  updateExposure: state.rollsCollection.updateExposure,
  toggleModal: state.rollsCollection.toggleModal,
  currentRoll: state.rollsCollection.currentRoll,
  exposureForm: state.rollsCollection.exposureForm,
  rollForm: state.rollsCollection.rollForm,
  currentExposure: state.rollsCollection.currentExposure,
});

export default connect(
  mapStateToProps,
  { addExposure, toggleModal, addRoll, setModalMode, updateRoll, updateExposure }
)(DynamicForm);
