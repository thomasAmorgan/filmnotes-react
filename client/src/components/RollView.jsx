import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import editRoll from "../assests/icons/pngs/edit.png";
import trashRoll from "../assests/icons/pngs/trash.png";
import RollExposures from "./RollExposures";
import { toggleModal, setModalMode, setCurrentRoll } from "../actions/rollActions";
import LoadingDisplay from "./LoadingDisplay";

class RollView extends Component {
  handleModalEdit = () => {
    this.props.setModalMode({
      mode: "roll",
      editing: true
    });
    this.props.toggleModal();
  };

  handleModalDelete = () => {
    this.props.setModalMode({
      mode: "roll",
      deleting: true
    });
    this.props.toggleModal();
  }

  componentDidMount() {
    this.props.setCurrentRoll(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.setCurrentRoll(this.props.match.params.id);
    }
  }

  render() {
    let {
      title,
      date,
      stock,
      iso,
      camera,
      format,
      tags,
      notes
    } = this.props.currentRoll;

    let colors = ["blue", "green", "yellow", "orange", "red"];

    return (
      <div>
        {this.props.rollLoading ?
          <LoadingDisplay />
          :
          <div className="roll-view">
            <div className="roll-header">
              <div className="roll-title">{title}</div>

              <div className="roll-actions">
                <img src={editRoll} onClick={this.handleModalEdit} alt="edit roll" className="roll-edit-btn" />
                <img src={trashRoll} onClick={this.handleModalDelete} alt="trash roll" className="roll-trash-btn" />
              </div>
            </div>
            <hr />
            <div className="roll-date">Date: {new Date(date).toLocaleDateString()}</div>
            <div className="roll-stats">
              <div className="roll-stock">Stock: {stock}</div>
              <div className="roll-iso">ISO: {iso}</div>
              <div className="roll-camera">Camera: {camera}</div>
              <div className="roll-format">Format: {format}</div>
            </div>
            <div className="roll-tags">
              <div className="roll-tags-header">Tags:</div>
              <div className="roll-tags-list">
                {tags ? tags.map((tag, index) => (
                  <div
                    className={"roll-tags-item " + colors[index % colors.length]}
                    key={index}
                  >
                    {tag}
                  </div>
                )) : null}
              </div>
            </div>
            <hr />
            <div className="roll-notes">
              <div>Notes</div>
              <div className="roll-description">{notes}</div>
            </div>
            <hr />
            <RollExposures />
          </div>
        }
      </div>
    );
  }
}

RollView.protoTypes = {
  currentRoll: PropTypes.object,
  setCurrentRoll: PropTypes.func.isRequired,
  rollLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  currentRoll: state.rollsCollection.currentRoll,
  setCurrentRoll: state.rollsCollection.setCurrentRoll,
  rollLoading: state.rollsCollection.rollLoading
});

export default connect(
  mapStateToProps,
  { toggleModal, setModalMode, setCurrentRoll }
)(RollView);
