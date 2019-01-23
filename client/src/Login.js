import React, { Component } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div>
        <a href="/auth/google">Sign In with Google</a>
      </div>
    );
  }
}

export default Login;
