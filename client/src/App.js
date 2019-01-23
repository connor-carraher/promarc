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

class App extends Component {
  state = {
    data: []
  };

  render() {
    return (
      <div>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/test" component={Test} />
            <Route path="/createpost" component={CreatePost} />
            <Route path="/viewpost" component={PostCard} />
            <Route path="/post/:id" component={Post} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
