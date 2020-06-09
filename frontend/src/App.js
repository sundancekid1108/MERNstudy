import React from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom"
import Feed from '../src/Components/Feed/Feed'
import Login from '../src/Components/Login/Login'
import SignUp from '../src/Components/SignUp/SignUp'

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Feed} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
    </Router>
  );
}

export default App;
