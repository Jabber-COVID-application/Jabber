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
import Visit from "./pages/visit/Visit";
import PathAttemptProvider, {
  RedirectCatchPathAttempt,
  RedirectToPathAttempt,
} from "./components/routing/path-attempt/PathAttempt";

const App = observer(
  (): JSX.Element => {
    const { auth, ui } = useStore();

    return (
      <BrowserRouter>
        <Loader loading={ui.isLoading}>
          <PathAttemptProvider>
            {auth.isAuthenticated ? (
              <SidebarLayout>
                <Switch>
                  <Route path="/dashboard" component={Dashboard} exact />
                  <Route path="/rollout" component={Rollout} exact />
                  <Route path="/profile" component={Profile} exact />
                  <Route path="/visit/:venueId" component={Visit} exact />
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
          </PathAttemptProvider>
        </Loader>
      </BrowserRouter>
    );
  }
);

export default App;
