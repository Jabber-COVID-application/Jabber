import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router";
import { useStore } from "./store";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import { observer } from "mobx-react";
import Rollout from "./pages/rollout/Rollout";
import SidebarLayout from "./components/layout/sidebar-layout/SidebarLayout";

const App = observer(
  (): JSX.Element => {
    const { auth } = useStore();

    return (
      <BrowserRouter>
      kwejfvfeb
        {auth.isAuthenticated ? (
          <SidebarLayout>
            <Switch>
              <Route path="/dashboard" component={Dashboard} exact />
              <Route path="/rollout" component={Rollout} exact />
              <Redirect to="/dashboard" />
            </Switch>
          </SidebarLayout>
        ) : (
          <Switch>
            <Route path="/login" component={Login} exact />
            <Route path="/signup" component={Signup} exact />
            <Redirect to="/login" />
          </Switch>
        )}
      </BrowserRouter>
    );
  }
);

export default App;
