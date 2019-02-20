import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  toggleModal,
  setModalMode
} from "../actions/rollActions";
import addShotBtn from "../assests/icons/pngs/add_shot.png";

class RollListItem extends Component {
  handleModal = () => {
    this.props.setModalMode({
      mode: "exposure",
      editing: false
    });
    this.props.toggleModal();
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
        <Link to={`/rolls/${this.props.roll._id}`}>
          <div className="roll-item-title">
            {title.length >= 23 ? title.substring(0, 20) + "..." : title}
          </div>
          {!!notes ?
            <div className="roll-item-description">
              {notes.substr(0, 40) + "..."}
            </div> :
            <div className="roll-item-description">
              {""}
            </div>
          }
          <div className="roll-item-date">
            {new Date(date).toLocaleDateString()}
          </div>
          <div className="roll-item-stock">Stock: {stock}</div>
          <div className="roll-item-iso">ISO: {iso}</div>
          <div className="roll-item-camera">Camera: {camera}</div>
        </Link>

        <div className="roll-add-btn">
          <Link to={`/rolls/${this.props.roll._id}`} onClick={this.handleModal}>
            <img src={addShotBtn} alt="add shot" />
          </Link>
        </div>
      </div>
    );
  }
}

RollListItem.protoTypes = {
  currentRoll: PropTypes.object,
  toggleModal: PropTypes.func,
  setModalMode: PropTypes.func
};

const mapStateToProps = state => ({
  currentRoll: state.rollsCollection.currentRoll,
  toggleModal: state.rollsCollection.toggleModal,
  setModalMode: state.rollsCollection.setModalMode
});

export default connect(
  mapStateToProps,
  { toggleModal, setModalMode }
)(RollListItem);
