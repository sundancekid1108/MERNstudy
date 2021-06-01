import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Feed from "./Views/Feed/Index";
import SignIn from "./Views/SignIn/Index";
import SignUp from "./Views/SignUp/Index";
import Admin from "./Views/Admin/Index";
// import UserProfile from "./Views/UserList/UserProfile";
import NotFound from "./Views/NotFound/Index";
import DashboardPage from "./Views/Dashboard/Index";
import UserList from "./Views/UserList/Index";
import Account from "./Views/Account/Index";
import Settings from "./Views/Settings/Index";
import theme from "./Theme/Index";

const App = () => {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            {/* <Route exact path="/userprofile" component={UserProfile} /> */}
            <Route exact path="/userslist" component={UserList} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/dashboard" component={DashboardPage} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
