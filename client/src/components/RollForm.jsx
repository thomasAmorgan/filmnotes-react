import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRoll, toggleModal } from "../actions/rollActions";

export class RollForm extends Component {
  state = {
    title: "",
    date: "",
    stock: "",
    iso: "",
    camera: "",
    format: "",
    tags: [],
    notes: ""
  };

  handleChange = e => {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  };

  handleSubmit = e => {
    e.preventDefault();

    let newRoll = {
      ...this.state,
      tags: this.state.tags.split(" ")
    };

    this.props.addRoll(newRoll);

    this.setState({
      title: "",
      date: "",
      stock: "",
      iso: "",
      camera: "",
      format: "",
      tags: [],
      notes: ""
    });

    this.props.toggleModal();
  };

  render() {
    return (
      <div className="roll-form">
        <div className="roll-form-title">New Roll</div>
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
              name="stock"
              type="text"
              placeholder="stock..."
              className="roll-stock-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="iso"
              type="text"
              placeholder="iso..."
              className="roll-iso-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="camera"
              type="text"
              placeholder="camera..."
              className="roll-camera-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="format"
              type="text"
              placeholder="format..."
              className="roll-format-input"
              required
              onChange={this.handleChange}
            />
            <input
              name="tags"
              type="text"
              placeholder="tags..."
              className="roll-tags-input"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="roll-form-description">
            <textarea
              name="notes"
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
  addRoll: PropTypes.func,
  toggleModal: PropTypes.func
};

const mapStateToProps = state => ({
  modalMode: state.rollsCollection.modalMode,
  addRoll: state.rollsCollection.addRoll,
  toggleModal: state.rollsCollection.toggleModal
});

export default connect(
  mapStateToProps,
  { addRoll, toggleModal }
)(RollForm);
