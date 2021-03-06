// /client/App.js
import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import Post from "./Post";
import Navbar from "./Navbar";
import Login from "./Login";
import Cookies from "js-cookie";
import EditPost from "./EditPost";
import MyPosts from "./MyPosts";
import Inbox from "./Inbox";
import ModeratorView from "./ModeratorView";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    loggedIn: false
  };

  render() {
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
                <Route path="/createpost" component={CreatePost} />
                <Route path="/inbox/:conversationId" component={Inbox} />
                <Route path="/myposts" component={MyPosts} />
                <Route path="/moderatorview" component={ModeratorView} />
                <Route path="/post/edit/:id" component={EditPost} />
                <Route path="/post/:id" component={Post} />
                <Route path="/" component={PostCard} />
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
