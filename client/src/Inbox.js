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
      conversationId: this.props.match.params.conversationId,
      outboundMessage: "",
      messages: []
    };

    //this.scrollBottom = this.scrollBottom.bind(this);
  }

  componentDidMount() {
    this.getCurrUser();
    this.getConversationsFromDb();
    this.getDataFromDb(this.props.match.params.conversationId);
    this.scrollBottomSmooth();
  }

  componentDidUpdate() {
    this.scrollBottomAuto();
  }

  getConversationsFromDb = () => {
    axios
      .get("/api/conversations/user")
      .then(res =>
        this.setState({ conversations: res.data.data.conversations })
      );
  };

  getDataFromDb = dat => {
    this.props.history.push("/inbox/" + dat);
    axios
      .get("/api/conversation/messages/" + dat)
      .then(res => this.setState({ messages: res.data }));
    this.scrollBottomSmooth();
  };

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ userId: res.data.user._id }));
  };

  sendMessage = () => {
    axios.post(
      "/api/conversation/message/update/" +
        this.props.match.params.conversationId,
      {
        content: this.state.outboundMessage
      }
    );
    this.handleSubmit();
    window.location.reload();
    this.scrollBottomAuto();
  };

  handleEnter = e => {
    if (e.key == "Enter") {
      document.getElementById("messageField").value = "";
      this.sendMessage();
    }
  };

  handleSubmit = () => {
    document.getElementById("messageField").value = "";
  };

  scrollBottomSmooth = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  scrollBottomAuto = () => {
    this.messagesEnd.scrollIntoView();
  };

  render() {
    const { data, conversations, messages } = this.state;
    const { conversationId } = this.props.match.params.conversationId;
    return (
      <div>
        <div
          id="sideNav"
          style={{
            float: "left",
            width: "25%",
            height: "100%",
            backgroundColor: "white",
            borderRight: "2px solid lightgray"
          }}
        >
          {conversations.length <= 0
            ? "No Conversations"
            : conversations.map((dat, index) => (
                <div>
                  <Conversation
                    key={dat}
                    conversationId={dat}
                    isSelected={dat == this.props.match.params.conversationId}
                    userId={this.state.userId}
                    onClick={e => this.getDataFromDb(dat)}
                  />
                </div>
              ))}
        </div>
        <div
          style={{
            float: "right",
            width: "75%"
          }}
        >
          <div className="flex-container">
            <ul id="messageList">
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
            <div
              id="dummyDiv"
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </div>
          <div className="message-input">
            <InputGroup>
              <Input
                id="messageField"
                placeholder="Type here"
                onChange={e =>
                  this.setState({ outboundMessage: e.target.value })
                }
                onKeyPress={this.handleEnter}
                autofocus="autofocus"
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
