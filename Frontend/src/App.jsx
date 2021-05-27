import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Feed from "./Views/Feed/Feed";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Views/SignUp/SignUp";
import Admin from "./Views/Admin/Admin";
import UserProfile from "./Views/UserProfile/UserProfile";
import NotFound from "./Views/NotFound/NotFound";
import DashboardPage from "./Views/Dashboard/Dashboard";
import theme from "./Theme/Index";

const App = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={Feed} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/userprofile" component={UserProfile} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
