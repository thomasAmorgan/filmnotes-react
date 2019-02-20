import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRolls } from "../actions/rollActions";
import RollListItem from "./RollListItem";
import { withRouter } from "react-router-dom";
import LoadingDisplay from "./LoadingDisplay";

class RollList extends Component {
  componentDidMount() {
    this.props.getRolls();
  }

  render() {
    const { rolls } = this.props;

    return (
      <div className="roll-list-view">
        {
          this.props.rollsLoading ?
            <LoadingDisplay />
            :
            rolls.map(roll => (
              <RollListItem key={roll._id} roll={roll} />
            ))
        }
      </div>
    );
  }
}

RollList.protoTypes = {
  rolls: PropTypes.array.isRequired,
  getRolls: PropTypes.func.isRequired,
  rollsLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  rolls: state.rollsCollection.rolls,
  getRolls: state.rollsCollection.getRolls,
  rollsLoading: state.rollsCollection.rollsLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRolls }
  )(RollList)
);
