import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Route,
  HashRouter,
  BrowserRouter as Router,
  Switch,
  useHistory
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from './Theme/Index';
import Alert from './Layouts/Alert/Index';
import ProtectedRoute from './Routes/ProtectedRoute/Index';
import * as AuthActions from './Store/Actions/AuthActions';
import store from './Store/Index';
import Loading from './Components/Loading/Index';

const Feed = lazy(() => import('./Views/Feed/Index'));
const SignIn = lazy(() => import('./Views/Admin/SignIn/Index'));
const SignUp = lazy(() => import('./Views/SignUp/Index'));
const AdminSignUp = lazy(() => import('./Views/Admin/AdminSignUp/Index'));
const MoviePage = lazy(() => import('./Views/Public/MoviePage/Index'));
const NotFound = lazy(() => import('./Views/NotFound/Index'));
const DashboardPage = lazy(() => import('./Views/Admin/Dashboard/Index'));
const UserList = lazy(() => import('./Views/Admin/UserList/Index'));
const Account = lazy(() => import('./Views/Admin/Account/Index'));
const Settings = lazy(() => import('./Views/Settings/Index'));
const UpdateAccount = lazy(() => import('./Views/UpdateAccount/Index'));
const MovieList = lazy(() => import('./Views/Admin/MovieList/Index'));
const MovieInfo = lazy(() => import('./Views/Public/MovieInfo/Index'));
const MovieReservation = lazy(() =>
  import('./Views/Public/MovieReservation/Index')
);
const MovieReservationList = lazy(() =>
  import('./Views/Admin/MovieReservationList/Index')
);

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
          <Suspense fallback={<Loading />}>
            <HashRouter>
              <Switch>
                <Route exact path="/" component={MoviePage} />
                <Route exact path="/movie/:id" component={MovieInfo} />
                <Route
                  exact
                  path="/movie/moviereservation/:id"
                  component={MovieReservation}
                />
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
                <ProtectedRoute
                  exact
                  path="/admin/account"
                  component={Account}
                />
                <ProtectedRoute
                  exact
                  path="/admin/updateaccount"
                  component={UpdateAccount}
                />
                <ProtectedRoute
                  exact
                  path="/admin/moviereservationlist"
                  component={MovieReservationList}
                />
                <ProtectedRoute
                  exact
                  path="/admin/settings"
                  component={Settings}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </HashRouter>
          </Suspense>
        </MuiThemeProvider>
      </Provider>
    </>
  );
};

export default App;
