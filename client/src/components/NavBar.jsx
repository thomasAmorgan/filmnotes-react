import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import roll from "../assests/icons/pngs/roll.png";
import addRoll from "../assests/icons/pngs/add_roll.png";
import { Switch, Route } from "react-router";
import RollList from "./RollList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { toggleModal, setModalMode } from "../actions/rollActions";
import PropTypes from "prop-types";

class NavBar extends Component {
  handleModal = () => {
    this.props.toggleModal();
    this.props.setModalMode({
      mode: "roll",
      editing: false
    });
  };

  render() {
    return (
      <div className="sidebar">
        <div className="navlinks">
          <NavLink
            to="/"
            className="navbar-link"
            activeClassName="navbar-link-active"
          >
            <img src={roll} alt="display rolls" />
          </NavLink>
          <img
            src={addRoll}
            alt="add roll"
            className="add-roll-btn"
            onClick={this.handleModal}
          />
        </div>
        <div className="sidebar-content">
          <Switch>
            <Route exact path="/" component={RollList} />
          </Switch>
        </div>
      </div>
    );
  }
}

NavBar.protoTypes = {
  modalOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  setModalMode: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalOpen: state.rollsCollection.modalOpen,
  toggleModal: state.rollsCollection.toggleModal,
  setModalMode: state.rollsCollection.setModalMode
});

export default withRouter(
  connect(
    mapStateToProps,
    { toggleModal, setModalMode }
  )(NavBar)
);
