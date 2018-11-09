import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import addShotBtn from "../assests/icons/pngs/add_shot.png";

class RollExposures extends Component {
  render() {
    let { exposures } = this.props.currentRoll;
    let colors = ["blue", "green", "yellow", "orange", "red"];

    return (
      <div className="roll-exposures">
        <div className="roll-exposures-header">
          <div>Exposures</div>
          <div className="roll-exposures-btn">
            <img src={addShotBtn} alt="add shot" />
          </div>
        </div>
        <div className="roll-exposures-list">
          {exposures.map((exposure, index) => (
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
                <div className="exposure-date">
                  {new Date(exposure.date).toLocaleDateString()}
                </div>
              </div>
              <div className="exposure-stats">
                <div className="exposure-aperture">
                  {"f/" + exposure.aperture}
                </div>
                <div className="exposure-shutter">{exposure.shutter}</div>
                <div className="exposure-lens">{exposure.lens}</div>
              </div>
              <div className="exposure-description">{exposure.description}</div>
              {/* <hr /> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

RollExposures.protoTypes = {
  currentRoll: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentRoll: state.rollsCollection.currentRoll
});

export default connect(mapStateToProps)(RollExposures);
