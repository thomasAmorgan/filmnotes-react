import React from "react";
import ReactDOM from "react-dom";
import "./assests/scss/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
