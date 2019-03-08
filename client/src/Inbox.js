import React, { Component } from "react";
import axios from "axios";
import Message from "./Message";
import Conversation from "./Conversation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button,
  Form
} from "reactstrap";
import "./Inbox.css";

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      conversations: [],
      userId: "",
      conversationId: "",
      outboundMessage: "",
      messages: []
    };
  }

  componentDidMount() {
    this.getCurrUser();
    this.getConversationsFromDb();
  }

  getConversationsFromDb = () => {
    axios
      .get("/api/conversations/user")
      .then(res =>
        this.setState({ conversations: res.data.data.conversations })
      );
  };

  getDataFromDb = dat => {
    this.setState(prevState => ({ conversationId: dat }));
    axios
      .get("/api/conversation/messages/" + dat)
      .then(res => this.setState({ messages: res.data }));
  };

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ userId: res.data.user._id }));
  };

  sendMessage = () => {
    axios.post(
      "/api/conversation/message/update/" + this.state.conversationId,
      {
        content: this.state.outboundMessage
      }
    );
    this.handleSubmit();
  };

  handleSubmit = () => {
    document.getElementById("messageField").value = "";
  };

  render() {
    const { data, conversations, conversationId, messages } = this.state;
    // const messages = this.state.messages || [];
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
          <ul>
            {conversations.length <= 0
              ? "No Conversations"
              : conversations.map((dat, index) => (
                  <div>
                    <Conversation
                      key={dat}
                      conversationId={dat}
                      userId={this.state.userId}
                      onClick={e => this.getDataFromDb(dat)}
                    />
                  </div>
                ))}
          </ul>
        </div>
        <div
          style={{
            float: "right",
            width: "75%"
          }}
        >
          <div className="flex-container">
            <ul>
              {conversationId == "" || !messages.data
                ? "No conversation selected"
                : messages.data.map((dat, index) =>
                    //Logic for mine or yours container
                    dat.userFrom == this.state.userId ? (
                      <React.Fragment>
                        <div className="mine-container">
                          <Message message={dat.content} mineOrYours="mine" />
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="yours-container">
                          <Message message={dat.content} mineOrYours="yours" />
                        </div>
                      </React.Fragment>
                    )
                  )}
            </ul>
          </div>
          <div className="message-input">
            <InputGroup>
              <Input
                id="messageField"
                placeholder="Type here"
                onChange={e =>
                  this.setState({ outboundMessage: e.target.value })
                }
              />
              <InputGroupAddon addonType="append">
                <Button onClick={e => this.sendMessage()}>Send</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default Inbox;
