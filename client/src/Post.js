import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

class Post extends Component {
  state = {
    data: [],
    id: "",
    user: []
  };

  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.getCurrUser();
    this.getPostFromDb();
  }

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ user: res.data.user }));
  };

  getPostFromDb = () => {
    fetch(`/api/post/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  deletePostFromDb = id => {
    axios.delete("/api/post/delete/" + id);
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        {!data ? (
          "Post Does Not Exist"
        ) : (
          <React.Fragment>
            <div style={{ marginLeft: "20px", paddingTop: "10px" }}>
              {/*<span style={{ color: "gray" }}> id: </span> {data._id} <br />
            <span style={{ color: "gray" }}> Title: </span> */}
              <span style={{ fontSize: "24pt" }}>{data.title}</span> <br />
              <span
                style={{ fontWeight: "bold", fontSize: "16pt", color: "black" }}
              >
                {" "}
                Skills:{" "}
              </span>
              <span style={{ fontSize: "16pt" }}> {data.skills} </span>
              {/*<br />
            <span style={{ color: "gray" }}> Description: </span>*/}
              <br />{" "}
              <span style={{ fontSize: "12pt" }}>{data.description}</span>{" "}
              <br />
              <hr />
              {this.state.user._id == this.state.data.createdBy ||
              this.state.user.isModerator ? (
                <React.Fragment>
                  <Button
                    style={{ float: "right", backGroundColor: "#069BEE" }}
                    href={"/post/edit/" + data._id}
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                  <Button
                    style={{ float: "right", backgroundColor: "#069BEE" }}
                    onClick={() => this.deletePostFromDb(data._id)}
                    href="/"
                  >
                    Delete
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment> </React.Fragment>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Post;
