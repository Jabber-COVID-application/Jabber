import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/global.scss";
import App from "./App";
import { StoreProvider } from "./store";
import ScrollLockerProvider from "./components/layout/scroll-locker/ScrollLocker";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ScrollLockerProvider>
        <App />
      </ScrollLockerProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
