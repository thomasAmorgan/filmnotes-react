import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getRolls } from "../actions/rollActions";
import RollListItem from "./RollListItem";
import { withRouter } from "react-router-dom";

class RollList extends Component {
  componentDidMount() {
    this.props.getRolls();
  }

  render() {
    const { rolls } = this.props;

    return (
      <div className="roll-list-view">
        {rolls.map(roll => (
          <RollListItem key={roll._id} roll={roll} />
        ))}
      </div>
    );
  }
}

RollList.protoTypes = {
  rolls: PropTypes.array.isRequired,
  getRolls: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  rolls: state.rollsCollection.rolls,
  getRolls: state.rollsCollection.getRolls
});

export default withRouter(
  connect(
    mapStateToProps,
    { getRolls }
  )(RollList)
);
