import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    Route,
    HashRouter,
    BrowserRouter,
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


const Routes = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthAction.getLoginUserInfo());
        dispatch(MovieAction.getMovieList())
    }, []);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={
                            <WithLayoutRoute>
                                <MoviePage />
                            </WithLayoutRoute>
                        } />
                        <Route exact path="/signin" element={<SignIn />} />
                        <Route exact path='/signup' element={<SignUp />} />

                        <Route exact path="/movie/:id" element={<MovieInfo />} />
                        <Route
                            exact
                            path="/movie/moviereservation/:id"
                            element={<MovieReservation />}
                        />
                        <Route
                            exact
                            path="/movie/category/:category"
                            element={<MovieCategoryList />}
                        />
                        <Route exact path="/theaters" element={<Theaters />} />
                        <Route exact path="/feed" element={<Feed />} />


                        {/* <Route exact path="/adminsignup" element={<AdminSignUp />} /> */}
                        <Route exact path="/admin/movies" element={
                            <ProtectedRoute>
                                <MovieList />
                            </ProtectedRoute>
                        } />

                        {/* 분리 */}
                        <Route
                            exact
                            path="/admin/userslist"
                            element={
                                <ProtectedRoute>
                                    <UserList />
                                </ProtectedRoute>
                            }
                        />


                        <Route
                            exact
                            path="/admin/dashboard"
                            element={<ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/admin/tmdbmovie"
                            element={<ProtectedRoute>
                                <TmdbMoviePage />
                            </ProtectedRoute>
                            }
                        />




                        <Route
                            exact
                            path="/admin/account"
                            element={
                                <ProtectedRoute>
                                    <Account />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            exact
                            path="/admin/reservation"
                            element={
                                <ProtectedRoute>
                                    <MovieReservationList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/movieshowtimes"
                            element={
                                <ProtectedRoute>
                                    <MovieShowTimeList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin/theaters"
                            element={
                                <ProtectedRoute>
                                    <TheatersList />
                                </ProtectedRoute>

                            }
                        />
                        <Route
                            exact
                            path="/admin/settings"
                            element={
                                <ProtectedRoute>
                                    <Settings />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    )
}


export default Routes;
