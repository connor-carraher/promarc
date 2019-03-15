import React, { Component } from "react";
import axios from "axios";
import "./Message.css";
import { Button, Spinner } from "reactstrap";
import "./Conversation.css";
import Avatar from "react-avatar";

class Conversation extends Component {
  state = {
    conversation: "",
    recipient: "",
    lastMessage: ""
  };

  componentDidMount() {
    this.getConversation();
    this.getRecipient();
    this.getLastMessage();
  }

  getConversation = () => {
    axios
      .get("/api/conversation/" + this.props.conversationId)
      .then(res => this.setState({ conversation: res.data }));
  };

  getRecipient = () => {
    axios
      .get("/api/conversation/user/" + this.props.conversationId)
      .then(res => this.setState({ recipient: res.data }));
  };

  getLastMessage = () => {
    axios
      .get("/api/conversation/message/" + this.props.conversationId)
      .then(res => this.setState({ lastMessage: res.data }));
  };

  render() {
    var isSelected = this.props.isSelected;
    var recipient = this.state;
    return (
      <React.Fragment>
        {isSelected ? (
          <div className="panel selected" onClick={this.props.onClick}>
            {recipient.recipient.data ? (
              <div>
                <div style={{ height: "100%", float: "left" }}>
                  <Avatar
                    name={recipient.recipient.data.username}
                    size="50"
                    round
                    color="#069bee"
                  />
                </div>
                <div className="user">{recipient.recipient.data.username}</div>
              </div>
            ) : (
              <Spinner color="primary" />
            )}
            {this.state.lastMessage.data ? (
              <div className="lastMessage">
                {this.state.lastMessage.data.content}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="panel" onClick={this.props.onClick}>
            {recipient.recipient.data ? (
              <div>
                <div style={{ height: "100%", float: "left" }}>
                  <Avatar
                    name={recipient.recipient.data.username}
                    size="50"
                    round
                    color="#069bee"
                  />
                </div>
                <div className="user">{recipient.recipient.data.username}</div>
              </div>
            ) : (
              <Spinner color="primary" />
            )}
            {this.state.lastMessage.data ? (
              <div className="lastMessage">
                {" "}
                {this.state.lastMessage.data.content}
              </div>
            ) : (
              ""
            )}
          </div>
        )}
        <hr style={{ marginTop: "0px", marginBottom: "0px" }} />
      </React.Fragment>
    );
  }
}
export default Conversation;
