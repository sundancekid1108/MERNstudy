import React from "../node_modules/@types/react";
import {
  Link,
  Route,
  BrowserRouter as Router,
} from "../node_modules/react-router-dom";
import Feed from "./Components/Feed/Feed";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Router>
  );
};

export default App;
