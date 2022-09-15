import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  Route,
  HashRouter,
  BrowserRouter,

  Routes,
  useNavigate
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import './Assets/Scss/Index.scss'
import 'typeface-montserrat';

import theme from './Theme/Index';
import Alert from './Components/Alert/Alert';
import ProtectedRoute from './Routers/ProtectedRoute/ProtectedRoute';
import WithLayoutRoute from './Routers/WithLayoutRoute/WithLayoutRoute'

import * as MovieAction from './Store/Actions/MovieAction'
import * as AuthAction from './Store/Actions/AuthAction';
import store from './Store/Index';
import Loading from './Components/Loading/Loading';

import AdminLayout from './Layouts/AdminLayout/AdminLayout';
import UserLayout from './Layouts/UserLayout/UserLayout'

const Feed = lazy(() => import('./Views/Feed/Feed'));
const SignIn = lazy(() => import('./Views/Public/SignIn/SignIn'));
const SignUp = lazy(() => import('./Views/Public/SignUp/SignUp'));
// const AdminSignUp = lazy(() => import('./Views/Admin/AdminSignUp/AdminSignUp'));
const MoviePage = lazy(() => import('./Views/Public/MoviePage/MoviePage'));
const NotFound = lazy(() => import('./Views/NotFound/NotFound'));
const DashboardPage = lazy(() =>
  import('./Views/Admin/DashboardPage/DashboardPage')
);
const UserList = lazy(() => import('./Views/Admin/UsersList/UserList'));
const Account = lazy(() => import('./Views/Admin/Account/Account'));
const Settings = lazy(() => import('./Views/Settings/Settings'));

const MovieList = lazy(() => import('./Views/Admin/MovieList/MovieList'));
const MovieInfo = lazy(() => import('./Views/Public/MovieInfo/MovieInfo'));
const MovieReservation = lazy(() =>
  import('./Views/Public/MovieReservation/MovieReservation')
);
const MovieReservationList = lazy(() =>
  import('./Views/Admin/MovieReservationList/MovieReservationList')
);
const MovieShowTimeList = lazy(() =>
  import('./Views/Admin/MovieShowTimeList/MovieShowTimeList')
);
const MovieCategoryList = lazy(() =>
  import('./Views/Public/MovieCategoryList/MovieCategoryList')
);

const TmdbMoviePage = lazy(() => import('./Views/Admin/TmdbMoviePage/TmdbMoviePage'))

const Theaters = lazy(() => import('./Views/Public/Theaters/Theaters'));
const TheatersList = lazy(() =>
  import('./Views/Admin/TheatersList/TheatersList')
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthAction.getLoginUserInfo());
    dispatch(MovieAction.getMovieList())
  }, []);

  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Alert />
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <Routes>
                <Route exact path="/signin" element={<SignIn />} />
                <Route exact path='/signup' element={<SignUp />} />

                <Route exact path="/" element={
                  <WithLayoutRoute layout={UserLayout} >
                    <MoviePage />
                  </WithLayoutRoute>
                } />


                <Route exact path="/movie/:id" element={
                  <WithLayoutRoute layout={UserLayout} >
                    <MovieInfo />
                  </WithLayoutRoute>
                } />
                <Route
                  exact
                  path="/movie/moviereservation/:id"
                  element={
                    <WithLayoutRoute layout={UserLayout} >
                      <MovieReservation />
                    </WithLayoutRoute>
                  }
                />
                <Route
                  exact
                  path="/movie/category/:category"
                  element={
                    <WithLayoutRoute layout={UserLayout} >
                      <MovieCategoryList />
                    </WithLayoutRoute>
                  }
                />
                <Route exact path="/theaters" element={
                  <WithLayoutRoute layout={UserLayout} >
                    <Theaters />
                  </WithLayoutRoute>
                } />
                <Route exact path="/feed" element={<Feed />} />


                {/* 분리 */}

                {/* <Route exact path="/adminsignup" element={<AdminSignUp />} /> */}
                <Route exact path="/admin/movies" element={
                  <ProtectedRoute layout={AdminLayout} >
                    <MovieList />
                  </ProtectedRoute>
                } />


                <Route
                  exact
                  path="/admin/userslist"
                  element={
                    <ProtectedRoute layout={AdminLayout}   >
                      <UserList />
                    </ProtectedRoute>
                  }
                />


                <Route
                  exact
                  path="/admin/dashboard"
                  element={<ProtectedRoute layout={AdminLayout}  >
                    <DashboardPage />
                  </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/admin/tmdbmovie"
                  element={<ProtectedRoute layout={AdminLayout}   >
                    <TmdbMoviePage />
                  </ProtectedRoute>
                  }
                />




                <Route
                  exact
                  path="/admin/account"
                  element={
                    <ProtectedRoute layout={AdminLayout}  >
                      <Account />
                    </ProtectedRoute>
                  }
                />

                <Route
                  exact
                  path="/admin/reservation"
                  element={
                    <ProtectedRoute layout={AdminLayout} >
                      <MovieReservationList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/admin/movieshowtimes"
                  element={
                    <ProtectedRoute layout={AdminLayout} >
                      <MovieShowTimeList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  exact
                  path="/admin/theaters"
                  element={
                    <ProtectedRoute layout={AdminLayout} >
                      <TheatersList />
                    </ProtectedRoute>

                  }
                />
                <Route
                  exact
                  path="/admin/settings"
                  element={
                    <ProtectedRoute layout={AdminLayout} >
                      <Settings />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </Suspense>
        </ThemeProvider>
      </Provider>
    </>
  );
};

export default App;
