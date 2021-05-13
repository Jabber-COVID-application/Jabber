import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";
import { StoreProvider } from "./store";
import Login from "./pages/login/Login";

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;
