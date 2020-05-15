/* eslint-disable import/no-named-as-default */
import { Route, Switch } from "react-router-dom";

import AboutPage from "../components/AboutPage";
import LoginPage from "./LoginPage";
import NotFoundPage from "../components/NotFoundPage.js";
import React from "react";
import { hot } from "react-hot-loader";
import { Dashboard } from "./Dashboard";

class App extends React.Component {
  render() {
    return (
      <div>
        {/* <div>
          <NavLink exact to="/" activeStyle={activeStyle}>Home</NavLink>
          {' | '}
          <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
        </div> */}
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);
