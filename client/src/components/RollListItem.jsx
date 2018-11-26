import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setCurrentRoll,
  toggleModal,
  setModalMode
} from "../actions/rollActions";
import addShotBtn from "../assests/icons/pngs/add_shot.png";

class RollListItem extends Component {
  handleModal = () => {
    this.setRoll();
    this.props.setModalMode({
      mode: "exposure",
      editing: false
    });
    this.props.toggleModal();
  };

  setRoll = () => {
    this.props.setCurrentRoll(this.props.roll._id);
  };

  checkActive = () => {
    if (this.props.currentRoll._id === this.props.roll._id) {
      return "roll-list-item active-roll";
    } else {
      return "roll-list-item";
    }
  };

  render() {
    let { title, date, notes, stock, iso, camera } = this.props.roll;

    return (
      <div className={this.checkActive()}>
        <div onClick={this.setRoll}>
          <div className="roll-title-group">
            <div className="roll-item-title">{title}</div>
            <div className="roll-item-date">
              {new Date(date).toLocaleDateString()}
            </div>
          </div>
          <div className="roll-item-description">
            {notes.substr(0, 40) + "..."}
          </div>
          <div className="roll-item-stock">{"Stock: " + stock}</div>
          <div className="roll-item-iso">{"ISO: " + iso}</div>
          <div className="roll-item-camera">{"Camera: " + camera}</div>
        </div>

        <div className="roll-add-btn">
          <img src={addShotBtn} alt="add shot" onClick={this.handleModal} />
        </div>
      </div>
    );
  }
}

RollListItem.protoTypes = {
  setCurrentRoll: PropTypes.func.isRequired,
  currentRoll: PropTypes.object,
  toggleModal: PropTypes.func,
  setModalMode: PropTypes.func
};

const mapStateToProps = state => ({
  setCurrentRoll: state.rollsCollection.setCurrentRoll,
  currentRoll: state.rollsCollection.currentRoll,
  toggleModal: state.rollsCollection.toggleModal,
  setModalMode: state.rollsCollection.setModalMode
});

export default connect(
  mapStateToProps,
  { setCurrentRoll, toggleModal, setModalMode }
)(RollListItem);
