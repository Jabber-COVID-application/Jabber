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
import Profile from "./pages/profile/Profile";
import Loader from "./components/layout/loader/Loader";
import Checkin from "./pages/visits/checkin/Checkin";
import {
  RedirectCatchPathAttempt,
  RedirectToPathAttempt,
} from "./components/routing/path-attempt/PathAttempt";
import RolloutDetailsForm from "./pages/rollout/rollout-details/RolloutDetailsForm";
import Visits from "./pages/visits/Visits";
import Scan from "./pages/visits/scan/Scan";

const App = observer(
  (): JSX.Element => {
    const { auth, ui } = useStore();

    return (
      <BrowserRouter>
        <Loader loading={ui.isLoading}>
          {auth.isAuthenticated ? (
            <SidebarLayout>
              <Switch>
                <Route path="/dashboard" component={Dashboard} exact />
                <Route path="/rollout" component={Rollout} exact />
                <Route
                  path="/rollout/details"
                  component={RolloutDetailsForm}
                  exact
                />
                <Route path="/profile" component={Profile} exact />
                <Route path="/visits" component={Visits} exact />
                <Route path="/visits/scan" component={Scan} exact />
                <Route path="/visits/:venueId" component={Checkin} exact />
                <RedirectToPathAttempt to="/dashboard" />
              </Switch>
            </SidebarLayout>
          ) : (
            <Switch>
              <Route path="/login" component={Login} exact />
              <Route path="/signup" component={Signup} exact />
              <RedirectCatchPathAttempt to="/login" />
            </Switch>
          )}
        </Loader>
      </BrowserRouter>
    );
  }
);

export default App;
