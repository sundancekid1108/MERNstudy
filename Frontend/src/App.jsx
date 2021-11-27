import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import SignIn from './Views/Admin/SignIn/Index';
import SignUp from './Views/SignUp/Index';
import AdminSignUp from './Views/Admin/AdminSignUp/Index';
import MoviePage from './Views/Public/MoviePage/Index';
import NotFound from './Views/NotFound/Index';
import DashboardPage from './Views/Admin/Dashboard/Index';
import UserList from './Views/Admin/UserList/Index';
import Account from './Views/Admin/Account/Index';
import Settings from './Views/Settings/Index';
import UpdateAccount from './Views/UpdateAccount/Index';
import MovieList from './Views/Admin/MovieList/Index';
import theme from './Theme/Index';
import Alert from './Layouts/Alert/Index';
import ProtectedRoute from './Routes/ProtectedRoute/Index';
import * as AuthActions from './Store/Actions/AuthActions';

import { Provider } from 'react-redux';
import store from './Store/Index';

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthActions.getLoginUserInfo());
  }, []);

  return (
    <>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={MoviePage} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/adminsignup" component={AdminSignUp} />
              <Route exact path="/admin/movies" component={MovieList} />
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
                path="/admin/updateaccount"
                component={UpdateAccount}
              />
              <ProtectedRoute
                exact
                path="/admin/settings"
                component={Settings}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    </>
  );
};

export default App;
