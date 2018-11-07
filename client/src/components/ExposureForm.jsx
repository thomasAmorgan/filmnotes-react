import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addExposure,
  toggleModal,
  setCurrentRoll
} from "../actions/rollActions";

export class RollForm extends Component {
  state = {
    aperture: "",
    date: "",
    description: "",
    lens: "",
    shutter: "",
    title: ""
  };

  handleChange = e => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();

    let newExposure = {
      ...this.state
    };

    this.props.addExposure(this.props.currentRoll._id, newExposure);

    this.setState({
      aperture: "",
      date: "",
      description: "",
      lens: "",
      shutter: "",
      title: ""
    });

    this.props.setCurrentRoll(this.props.currentRoll._id);
    this.props.toggleModal();
  };

  render() {
    return (
      <div className="roll-form">
        <div className="roll-form-title">New Exposure</div>
        <form id="roll-form" onSubmit={this.handleSubmit}>
          <div className="roll-form-stats">
            <input
              name="title"
              type="text"
              placeholder="title..."
              className="roll-title-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="date"
              type="text"
              placeholder="date..."
              className="roll-date-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="aperture"
              type="text"
              placeholder="aperture..."
              className="roll-aperture-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="shutter"
              type="text"
              placeholder="shutter..."
              className="roll-shutter-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="lens"
              type="text"
              placeholder="lens..."
              className="roll-lens-input"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="roll-form-description">
            <textarea
              name="description"
              placeholder="description..."
              className="roll-description-input"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="roll-form-buttons">
            <button className="red">Discard</button>
            <button className="green" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

RollForm.protoTypes = {
  modalMode: PropTypes.object,
  addExposure: PropTypes.func,
  toggleModal: PropTypes.func,
  currentRoll: PropTypes.object,
  setCurrentRoll: PropTypes.func
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  addExposure: state.rollsCollection.addRoll,
  toggleModal: state.rollsCollection.toggleModal,
  currentRoll: state.rollsCollection.currentRoll,
  setCurrentRoll: state.rollsCollection.setCurrentRoll
});

export default connect(
  mapStateToProps,
  { addExposure, toggleModal, setCurrentRoll }
)(RollForm);
