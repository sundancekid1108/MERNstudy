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
import Alert from './Layouts/Alert/Alert';
import ProtectedRoute from './Routes/ProtectedRoute/ProtectedRoute';
import * as AuthActions from './Store/Actions/AuthActions';
import store from './Store/Index';
import Loading from './Components/Loading/Loading';

const Feed = lazy(() => import('./Views/Feed/Feed'));
const SignIn = lazy(() => import('./Views/Admin/SignIn/SignIn'));
const SignUp = lazy(() => import('./Views/SignUp/SignUp'));
const AdminSignUp = lazy(() => import('./Views/Admin/AdminSignUp/AdminSignUp'));
const MoviePage = lazy(() => import('./Views/Public/MoviePage/MoviePage'));
const NotFound = lazy(() => import('./Views/NotFound/NotFound'));
const DashboardPage = lazy(() =>
  import('./Views/Admin/DashboardPage/DashboardPage')
);
const UserList = lazy(() => import('./Views/Admin/UsersList/UserList'));
const Account = lazy(() => import('./Views/Admin/Account/Account'));
const Settings = lazy(() => import('./Views/Settings/Settings'));
const UpdateAccount = lazy(() => import('./Views/UpdateAccount/UpdateAccount'));
const MoviesList = lazy(() => import('./Views/Admin/MoviesList/MoviesList'));
const MovieInfo = lazy(() => import('./Views/Public/MovieInfo/MovieInfo'));
const MovieReservation = lazy(() =>
  import('./Views/Public/MovieReservation/MovieReservation')
);
const MovieReservationList = lazy(() =>
  import('./Views/Admin/MovieReservationList/MovieReservationList')
);
const PublicMovieList = lazy(() =>
  import('./Views/Public/MovieList/MovieList')
);

const Theaters = lazy(() => import('./Views/Public/Theaters/Theaters'));
const TheatersList = lazy(() =>
  import('./Views/Admin/TheatersList/TheatersList')
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
                <Route
                  exact
                  path="/movie/category/:category"
                  component={PublicMovieList}
                />
                <Route exact path="/theaters" component={Theaters} />
                <Route exact path="/feed" component={Feed} />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/adminsignup" component={AdminSignUp} />
                <Route exact path="/admin/movies" component={MoviesList} />
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
                  path="/admin/theaters"
                  component={TheatersList}
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
