// /client/App.js
import React, { Component } from "react";

class PostCard extends Component {
  state = {
    data: [],
    id: 0,
    intervalIsSet: false
  };

  componentDidMount() {
    this.getDataFromDb();
  }

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch("/api/posts")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ padding: "10px" }} key={dat._id}>
                  <span style={{ color: "gray" }}> id: </span> {dat._id} <br />
                  <span style={{ color: "gray" }}> Title: </span>{" "}
                  <a href={"/post/" + dat._id}>{dat.title}</a> <br />
                  <span style={{ color: "gray" }}> Skills: </span>
                  <br /> {dat.skills} <br />
                  <span style={{ color: "gray" }}> Description: </span>
                  <br /> {dat.description} <br />
                  <hr />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}
export default PostCard;
