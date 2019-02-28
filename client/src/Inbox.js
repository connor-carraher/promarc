import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import Conversation from "./Conversation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from "reactstrap";
import "./Inbox.css";

class Inbox extends Component {
  state = {
    data: [],
    conversations: [],
    id: 0,
    intervalIsSet: false,
    userId: ""
  };

  componentDidMount() {
    this.getCurrUser();
    this.getDataFromDb();
    this.getConversationsFromDb();
  }

  getConversationsFromDb = () => {
    axios
      .get("/api/conversation/user")
      .then(res => this.setState({ conversations: res.data }));
  };

  getDataFromDb = () => {
    fetch("/api/posts")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ userId: res.data.userId }));
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <div
          style={{
            float: "left",
            width: "25%",
            height: "100%",
            borderRight: "2px solid lightgray"
          }}
        >
          <Conversation
            conversationId="5c764527e967040d5e5b3a8e"
            participants={[
              "5c64d85a3ebdf22bd89ec122",
              "5c64d83b61a5856a95bb143e"
            ]}
            userId={this.state.userId}
          />
        </div>
        <div
          style={{
            float: "right",
            width: "75%"
          }}
        >
          <div className="flex-container">
            {data.map(dat => (
              //Logic for mine or yours container
              <div className="yours-container">
                <Message message={dat.title} />
              </div>
            ))}
          </div>
          <div className="message-input">
            <InputGroup>
              <Input placeholder="Type here" />
              <InputGroupAddon addonType="append">
                <Button>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default Inbox;
