import React, { Component } from "react";
import DynamicForm from "./DynamicForm";

export default class Modal extends Component {
  render() {
    return (
      <div className="modal">
        <DynamicForm />
      </div>
    );
  }
}
