import React, { Component } from "react";
import axios from "axios";
import "./Message.css";
import { Button, Spinner } from "reactstrap";

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

  //<React.Fragment>
  // {this.state.lastMessage.data
  //   ? this.state.lastMessage.data.content
  //   : ""}
  //</React.Fragment>
  //{this.state.conversation.data}
  render() {
    var isSelected = this.props.isSelected;
    var recipient = this.state;
    return (
      <React.Fragment>
        {isSelected ? (
          <div>
            {recipient.recipient.data ? (
              <React.Fragment>
                <Button color="secondary" onClick={this.props.onClick}>
                  {recipient.recipient.data.username}
                </Button>
                {this.state.lastMessage.data
                  ? this.state.lastMessage.data.content
                  : ""}
              </React.Fragment>
            ) : (
              <Spinner color="primary" />
            )}
            <br />
            <br />
            <hr />
          </div>
        ) : (
          <div>
            {recipient.recipient.data ? (
              <React.Fragment>
                <Button outline color="secondary" onClick={this.props.onClick}>
                  {recipient.recipient.data.username}
                </Button>
                <div>
                  {this.state.lastMessage.data
                    ? this.state.lastMessage.data.content
                    : ""}
                </div>
              </React.Fragment>
            ) : (
              <Spinner color="primary" />
            )}
            <br />
            <br />
            <hr />
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default Conversation;
