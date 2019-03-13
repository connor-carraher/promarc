import React, { Component } from "react";
import axios from "axios";
import "./Message.css";
import {Button} from "reactstrap";

class Conversation extends Component {
  componentDidMount() {

  }

  render() {
    var isSelected = this.props.isSelected;
    return (
      <React.Fragment>
      { isSelected ?
        (<div>
          <Button color="secondary" onClick={this.props.onClick}>
            {this.props.conversationId}
          </Button>
          <br />
          <br />
          <hr />
        </div>)
        :
      (<div>
        <Button outline color="secondary" onClick={this.props.onClick}>
          {this.props.conversationId}
        </Button>
        <br />
        <br />
        <hr />
      </div>)} </React.Fragment>
    );
  }
}
export default Conversation;
