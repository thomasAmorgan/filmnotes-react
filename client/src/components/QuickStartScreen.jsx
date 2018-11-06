import React, { Component } from "react";

export default class QuickStartScreen extends Component {
  state = {
    width: window.innerWidth
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  determineView = () => {
    if (this.state.width > 992) {
      return (
        <div className="quick-start">
          <div className="arrow" />
          <div className="text">Click a roll on the left to get started</div>
          <div />
        </div>
      );
    } else {
      return (
        <div className="quick-start">
          <div className="arrow" />
          <div className="text">Click a roll on top to get started</div>
        </div>
      );
    }
  };

  render() {
    return <div className="quick-start-container">{this.determineView()}</div>;
  }
}
