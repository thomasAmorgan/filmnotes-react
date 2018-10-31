import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import editRoll from "../assests/icons/pngs/edit.png";
import RollExposures from "./RollExposures";

class RollView extends Component {
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
    console.log(this.props.currentRoll);

    return (
      <div className="roll-view">
        <div className="roll-header">
          <div className="roll-title">{title}</div>
          <div className="roll-date">{new Date(date).toLocaleDateString()}</div>
          <div className="roll-edit-btn">
            <img src={editRoll} alt="edit roll" />
          </div>
        </div>
        <hr />
        <div className="roll-stats">
          <div className="roll-stock">{"Stock: " + stock}</div>
          <div className="roll-iso">{"ISO: " + iso}</div>
          <div className="roll-camera">{"Camera: " + camera}</div>
          <div className="roll-format">{"Format: " + format}</div>
        </div>
        <div className="roll-tags">
          <div className="roll-tags-header">{"Tags: "}</div>
          <div className="roll-tags-list">
            {tags.map((tag, index) => (
              <div className="roll-tags-item" key={index}>
                {tag}
              </div>
            ))}
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
    );
  }
}

RollView.protoTypes = {
  currentRoll: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentRoll: state.rollsCollection.currentRoll
});

export default connect(mapStateToProps)(RollView);