// /client/App.js
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

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
        <div
          style={{
            borderRight: "2px solid lightgray",
            backgroundColor: "#DAE0E6",
            paddingTop: "5px"
          }}
        >
          <ul>
            {data.length <= 0
              ? "NO DB ENTRIES YET"
              : data.map(dat => (
                  <div className="col-6 offset-md-3">
                    <li
                      style={{
                        listStyleType: "none",
                        margin: "20px",
                        padding: "5px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px"
                      }}
                      key={dat._id}
                    >
                      <a style={{ fontSize: "24pt" }} href={"/post/" + dat._id}>
                        {dat.title}
                      </a>{" "}
                      <br />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16pt",
                          color: "black"
                        }}
                      >
                        {" "}
                        Skills:{" "}
                      </span>{" "}
                      <span style={{ fontSize: "14pt" }}>
                        {dat.skills}
                      </span>{" "}
                      <br />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "12pt",
                          color: "gray"
                        }}
                      >
                        {" "}
                        Description:{" "}
                      </span>{" "}
                      <span style={{ fontSize: "12pt" }}>
                        {dat.description}
                      </span>{" "}
                      <br />
                      <hr />
                    </li>
                  </div>
                ))}
          </ul>
          <div style={{}}>Notifications</div>
        </div>
      </div>
    );
  }
}
export default PostCard;
