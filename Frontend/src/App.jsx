import React from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Feed from "./Views/Feed/Feed";
import SignIn from "./Views/SignIn/SignIn";
import SignUp from "./Routes/SignUp/SignUp";
import Admin from "./Views/Admin/Admin";
import UserProfile from "./Views/UserProfile/UserProfile";
import NotFound from "./Views/NotFound/NotFound";
import Navbar from "./Components/Navbar/Navbar";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/userprofile" component={UserProfile} />
          <Route exact path="/admin" component={Admin} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
