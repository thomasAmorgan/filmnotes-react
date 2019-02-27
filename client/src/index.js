import React from "react";
import ReactDOM from "react-dom";
import "./assests/scss/index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
