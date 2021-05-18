import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/global.scss";
import App from "./App";
import { StoreProvider } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
