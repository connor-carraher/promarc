// /client/App.js
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import Test from "./Test";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import Post from "./Post";
import axios from "axios";
import { Button } from "reactstrap";
import Navbar from "./Navbar";
import Login from "./Login";
import Cookies from "js-cookie";

class App extends Component {
  state = {
    data: [],
    loggedIn: false
  };

  render() {
    const authprops = {
      loggedIn: this.state.loggedIn
    };

    console.log(document.cookie);
    if (Cookies.get("session") != null) {
      this.state.loggedIn = true;
    }
    return (
      <React.Fragment>
        <Router>
          {this.state.loggedIn ? (
            <React.Fragment>
              <Navbar />
              <Switch>
                <Route path="/" />
                <Route path="/test" component={Test} />
                <Route path="/createpost" component={CreatePost} />
                <Route path="/viewpost" component={PostCard} />
                <Route path="/post/:id" component={Post} />
              </Switch>
            </React.Fragment>
          ) : (
            <Route path="/" component={Login} />
          )}
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
