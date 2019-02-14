// /client/App.js
import React, { Component } from "react";
import {Container} from "reactstrap";

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
        <div style={{borderRight:"2px solid lightgray",float:"left", width:"75%"}}>
        <ul>
          {data.length <= 0
            ? "NO DB ENTRIES YET"
            : data.map(dat => (
                <li style={{ listStyleType: "none", margin: "10px", paddingTop: "5px" }} key={dat._id}>
                  {/*<span style={{ color: "gray" }}> id: </span> {dat._id} <br />
                  <span style={{ color: "gray" }}> Title: </span>{" "}*/}
                  <a style={{fontSize:"24pt"}}href={"/post/" + dat._id}>{dat.title}</a> <br />
                  <span style={{ fontWeight:"bold", fontSize: "16pt", color: "black" }}> Skills: </span> <span style={{fontSize:"16pt"}}>{dat.skills}</span> <br />
                  <span style={{ fontWeight:"bold", fontSize: "12pt", color: "gray" }}> Description: </span> <span style={{fontSize:"12pt"}}>{dat.description}</span> <br />
                  <hr />
                </li>
              ))}
        </ul>
        </div>
        <div style={{float:"left", width:"25%"}}>
          
        </div>
      </div>
    );
  }
}
export default PostCard;
