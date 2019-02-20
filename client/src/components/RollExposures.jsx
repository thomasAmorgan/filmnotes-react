import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import addShotBtn from "../assests/icons/pngs/add_shot.png";
import editRoll from "../assests/icons/pngs/edit.png";
import trashRoll from "../assests/icons/pngs/trash.png";
import { toggleModal, setModalMode, setCurrentExposure } from "../actions/rollActions";
import LoadingDisplay from "./LoadingDisplay";

class RollExposures extends Component {
  handleModalAdd = () => {
    this.props.toggleModal();
    this.props.setModalMode({
      mode: "exposure",
      editing: false
    });
  };

  handleModalEdit = (expId) => {
    this.props.setCurrentExposure(this.props.currentRoll._id, expId);
    this.props.toggleModal();
    this.props.setModalMode({
      mode: "exposure",
      editing: true
    });
  }

  handleModalDelete = (expId) => {
    this.props.setCurrentExposure(this.props.currentRoll._id, expId);
    this.props.toggleModal();
    this.props.setModalMode({
      mode: "exposure",
      deleting: true
    });
  }

  render() {
    let { exposures } = this.props.currentRoll;
    let colors = ["blue", "green", "yellow", "orange", "red"];

    return (
      <div className="roll-exposures">
        <div className="roll-exposures-header">
          <div>Exposures</div>
          <div className="roll-exposures-btn">
            <img src={addShotBtn} alt="add shot" onClick={this.handleModalAdd} />
          </div>
        </div>
        {this.props.exposureLoading ?
          <LoadingDisplay />
          :
          <div className="roll-exposures-list">
            {exposures ? exposures.map((exposure, index) => (
              <div
                className={
                  "roll-exposures-item " +
                  colors[index % colors.length] +
                  "-border"
                }
                key={exposure._id}
              >
                <div className="exposure-header">
                  <div className="exposure-title">
                    {index + 1 + ": " + exposure.title}
                  </div>
                  <div className="exposure-actions">
                    <img
                      src={editRoll}
                      onClick={() => this.handleModalEdit(exposure._id)}
                      alt="edit exposure"
                      className="edit-btn"
                    />
                    <img
                      src={trashRoll}
                      onClick={() => this.handleModalDelete(exposure._id)}
                      alt="trash exposure"
                      className="trash-btn"
                    />
                  </div>
                </div>
                <div className="exposure-date">
                  {new Date(exposure.date).toLocaleDateString()}
                </div>
                <div className="exposure-stats">
                  <div className="exposure-aperture">
                    {"f/" + exposure.aperture}
                  </div>
                  <div className="exposure-shutter">{exposure.shutter}</div>
                  <div className="exposure-lens">{exposure.lens}</div>
                </div>
                <div className="exposure-description">{exposure.description}</div>
              </div>
            )) : null}
          </div>
        }
      </div>
    );
  }
}

RollExposures.protoTypes = {
  currentRoll: PropTypes.object.isRequired,
  toggleModal: PropTypes.func,
  setModalMode: PropTypes.func,
  setCurrentExposure: PropTypes.func,
  exposureLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  currentRoll: state.rollsCollection.currentRoll,
  toggleModal: state.rollsCollection.toggleModal,
  setModalMode: state.rollsCollection.setModalMode,
  setCurrentExposure: state.rollsCollection.setCurrentExposure,
  exposureLoading: state.rollsCollection.exposureLoading
});

export default connect(
  mapStateToProps,
  { toggleModal, setModalMode, setCurrentExposure }
)(RollExposures);
