import React, { Component } from "react";
import {
  Spinner,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./PostCard.css";

class ModeratorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: [],
      user: [],
      id: 0,
      intervalIsSet: false,
      modalTitle: "",
      modalSkills: "",
      modalDescription: "",
      modalId: "",
      modalFlags: "",
      createdBy: "",
      updatedAt: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(title, skills, description, id, numFlags, createdBy) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle: title,
      modalSkills: skills,
      modalDescription: description,
      modalId: id,
      modalFlags: numFlags,
      createdBy: createdBy
    }));
  }

  componentDidMount() {
    this.getDataFromDb();
    this.getCurrUser();
  }

  clearFlags = id => {
    axios.post("/api/post/flagclear/" + id);
    window.location.reload();
  };

  getDataFromDb = () => {
    fetch("/api/posts/flag")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  deletePostFromDb = id => {
    axios.delete("/api/post/delete/" + id);
    window.location.reload();
  };

  createConversation = () => {
    axios.post("/api/conversation/create/", {
      receiver: this.state.createdBy,
      sender: this.state.user._id
    });
  };

  getCurrUser = () => {
    axios
      .get("/api/getCurrUser")
      .then(res => this.setState({ user: res.data.user }));
  };

  render() {
    const { data } = this.state;
    var i = 0;
    while (i < data.length) {
      if (data[i].numFlags == 0) {
        data.splice(i, 1);
      } else {
        i++;
      }
    }

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
            {data.length <= 0 ? (
              <Spinner id="spinner" color="primary" />
            ) : (
              data.map((dat, index) => (
                <div className="col-6 offset-md-3">
                  <li className="postCard" key={dat._id}>
                    <Button
                      color="link"
                      style={{ fontSize: "24pt", padding: "0px" }}
                      onClick={e =>
                        this.toggle(
                          dat.title,
                          dat.skills,
                          dat.description,
                          dat._id,
                          dat.numFlags,
                          dat.createdBy
                        )
                      }
                    >
                      {dat.title}
                    </Button>
                    <Modal
                      isOpen={this.state.modal}
                      toggle={e =>
                        this.toggle(
                          dat.title,
                          dat.skills,
                          dat.description,
                          dat._id,
                          dat.numFlags,
                          dat.createdBy
                        )
                      }
                      className={this.props.className}
                    >
                      <ModalHeader
                        toggle={e =>
                          this.toggle(
                            dat.title,
                            dat.skills,
                            dat.description,
                            dat._id,
                            dat.numFlags,
                            dat.createdBy
                          )
                        }
                      >
                        {this.state.modalTitle}
                      </ModalHeader>
                      <ModalBody>
                        Skills: {this.state.modalSkills}
                        <hr />
                        Description: {this.state.modalDescription}
                      </ModalBody>
                      <ModalFooter>
                        <React.Fragment>
                          <div className="flagsDiv">
                            Flags: {this.state.modalFlags}
                          </div>
                          <div className="empty" />
                          <Button
                            className="modalButton"
                            tag={Link}
                            to={"/post/edit/" + this.state.modalId}
                          >
                            {" "}
                            Edit{" "}
                          </Button>
                          <Button
                            tag={Link}
                            className="modalButton"
                            onClick={() =>
                              this.deletePostFromDb(this.state.modalId)
                            }
                            to="/#/moderatorview"
                          >
                            Delete
                          </Button>
                        </React.Fragment>
                        <React.Fragment>
                          <Button
                            tag={Link}
                            className="modalButton"
                            onClick={() => this.clearFlags(this.state.modalId)}
                            to="/#/moderatorview"
                          >
                            Clear Flags
                          </Button>
                        </React.Fragment>
                      </ModalFooter>
                    </Modal>
                    <br />
                    <span className="skillHeader"> Skills: </span>
                    <span style={{ fontSize: "14pt" }}>
                      {dat.skills.split(",").map(skill => (
                        <div className="skillBox">{skill}</div>
                      ))}
                    </span>{" "}
                    <br />
                    <br />
                    <span className="headerSmall"> Description: </span>
                    <span style={{ fontSize: "12pt" }}>{dat.description}</span>
                    <br />
                    <span className="headerSmall">Date: </span>
                    <span style={{ fontSize: "12pt" }}>
                      {dat.updatedAt.substring(0, 10)}
                    </span>
                    <br />
                    <hr />
                  </li>
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default ModeratorView;
