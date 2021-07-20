import React, { useState, useEffect } from 'react';

import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Feed from './Views/Feed/Index';
import SignIn from './Views/SignIn/Index';
import SignUp from './Views/SignUp/Index';
import LandingPage from './Views/LandingPage/Index';
import NotFound from './Views/NotFound/Index';
import DashboardPage from './Views/Dashboard/Index';
import UserList from './Views/UserList/Index';
import Account from './Views/Account/Index';
import Settings from './Views/Settings/Index';
import EditAccount from './Views/EditAccount/Index';
import theme from './Theme/Index';
import { ProtectedRoute } from './Routes/ProtectedRoute/Index';
// import { createBrowserHistory } from 'history';

const App = (props) => {
  // const history = createBrowserHistory();
  const history = useHistory();
  const { user, ...rest } = props;
  console.log('appjsxuser', user);
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            {/* 분리 */}
            <ProtectedRoute
              exact
              path="/admin/userslist"
              component={UserList}
            />
            <ProtectedRoute
              exact
              path="/admin/dashboard"
              component={DashboardPage}
            />
            <ProtectedRoute exact path="/admin/account" component={Account} />
            <ProtectedRoute
              exact
              path="/admin/editaccount"
              component={EditAccount}
            />
            <ProtectedRoute exact path="/admin/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
