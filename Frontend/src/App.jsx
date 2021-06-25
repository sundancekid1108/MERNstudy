import React from 'react';
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Feed from './Views/Feed/Index';
import SignIn from './Views/SignIn/Index';
import SignUp from './Views/SignUp/Index';
import Admin from './Views/Admin/Index';

import NotFound from './Views/NotFound/Index';
import DashboardPage from './Views/Dashboard/Index';
import UserList from './Views/UserList/Index';
import Account from './Views/Account/Index';
import Settings from './Views/Settings/Index';
import theme from './Theme/Index';
import { ProtectedRoute } from './Routes/ProtectedRoute/Index';
import { createBrowserHistory } from 'history';

const App = () => {
  const history = createBrowserHistory();
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/feed" component={Feed} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/admin" component={Admin} />

            <ProtectedRoute exact path="/userslist" component={UserList} />
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
            <ProtectedRoute exact path="/account" component={Account} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </MuiThemeProvider>
    </>
  );
};

export default App;
