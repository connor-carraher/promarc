import React, { Component } from "react";
import axios from "axios";
import "./Message.css";

class Message extends Component {
  render() {
    return (
      //if statement to decide if mine or yours
      <div className={`talk-bubble round ${this.props.mineOrYours}`}>
        <div className="talktext ">
          <p>{this.props.message}</p>
        </div>
      </div>
    );
  }
}
export default Message;
