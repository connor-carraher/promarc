import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from "axios";

class Post extends Component {
  state = {
    data: [],
    id: null
  };

  componentDidMount() {
    this.getPostFromDb();
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getPostFromDb = () => {
    fetch(`/api/post/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {!data ? (
          "Post Does Not Exist"
        ) : (
          <React.Fragment>
            <span style={{ color: "gray" }}> id: </span> {data._id} <br />
            <span style={{ color: "gray" }}> Title: </span> {data.title} <br />
            <span style={{ color: "gray" }}> Skills: </span> {data.skills}{" "}
            <br />
            <span style={{ color: "gray" }}> Description: </span>
            <br /> {data.description} <br />
            <hr />
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Post;
