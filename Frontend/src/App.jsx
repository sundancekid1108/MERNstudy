import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Feed from "./Routes/Feed/Feed";
import Login from "./Routes/Login/Login";
import SignUp from "./Routes/SignUp/SignUp";
import UserProfile from "./Routes/UserProfile/UserProfile";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/userprofile" component={UserProfile} />
    </Router>
  );
};

export default App;
