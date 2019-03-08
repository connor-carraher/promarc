import React, { Component } from "react";
import axios from "axios";
import "./Message.css";

class Conversation extends Component {
  state = {
    conversationId: "",
    lastMessage: "",
    senderId: "",
    receiverUsername: "",
    participants: []
  };

  componentDidMount() {
    //this.getCurrUser();
    // this.getLastMessage();
    //this.getReceiverUsername();
    this.setState({
      conversationId: this.props.conversationId,
      senderId: this.props.userId
    });
  }

  // getLastMessage = () => {
  //   axios.get();
  // };

  // getReceiverUsername = () => {
  //   if (this.props.userId == this.props.participants[0]) {
  //     axios
  //       .get("/api/user/" + this.props.participants[1])
  //       .then(res =>
  //         this.setState({ receiverUsername: res.data.data.username })
  //       );
  //   } else if (this.props.userId == this.props.participants[1]) {
  //     axios
  //       .get("/api/user/" + this.props.participants[0])
  //       .then(res =>
  //         this.setState({ receiverUsername: res.data.data.username })
  //       );
  //   }
  // };

  // getCurrUser = () => {
  //   axios
  //     .get("/api/getCurrUser")
  //     .then(res => this.setState({ senderId: res.data.userId }));
  // };

  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>
          {this.state.conversationId}
        </button>
        <br />
        <br />
        <hr />
      </div>
    );
  }
}
export default Conversation;
