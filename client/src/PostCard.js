// /client/App.js
import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

import "./post.css";

class PostCard extends Component {
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
      createdBy: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(title, skills, description, id, createdBy) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      modalTitle: title,
      modalSkills: skills,
      modalDescription: description,
      modalId: id,
      createdBy: createdBy
    }));
  }

  componentDidMount() {
    this.getDataFromDb();
    this.getCurrUser();
  }

  getDataFromDb = () => {
    fetch("/api/posts")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  deletePostFromDb = id => {
    axios.delete("/api/post/delete/" + id);
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
            {data.length <= 0
              ? "NO DB ENTRIES YET"
              : data.map((dat, index) => (
                  <div className="col-6 offset-md-3">
                    <li
                      style={{
                        listStyleType: "none",
                        margin: "20px",
                        padding: "5px 5px 5px 20px",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "10px",
                        borderLeft: "6px solid #069BEE"
                      }}
                      key={dat._id}
                    >
                      <Button
                        color="link"
                        style={{ fontSize: "24pt", padding: "0px" }}
                        onClick={e =>
                          this.toggle(
                            dat.title,
                            dat.skills,
                            dat.description,
                            dat._id,
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
                              dat.createdBy
                            )
                          }
                        >
                          {this.state.modalTitle}
                        </ModalHeader>
                        <ModalBody>
                          Skills: {this.state.modalSkills}
                          <hr /> Description: {this.state.modalDescription}
                        </ModalBody>
                        <ModalFooter>
                          {this.state.user._id == this.state.createdBy ||
                          this.state.user.isModerator ? (
                            <React.Fragment>
                              <Button
                                style={{
                                  float: "right",
                                  backgroundColor: "#069BEE"
                                }}
                                href={"/post/edit/" + this.state.modalId}
                              >
                                {" "}
                                Edit{" "}
                              </Button>
                              <Button
                                style={{
                                  float: "right",
                                  backgroundColor: "#069BEE"
                                }}
                                onClick={() =>
                                  this.deletePostFromDb(this.state.modalId)
                                }
                                href="/"
                              >
                                Delete
                              </Button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment> </React.Fragment>
                          )}
                          <Button
                            style={{
                              float: "right",
                              backgroundColor: "#069BEE"
                            }}
                            onClick={() => this.createConversation()}
                            href="/inbox"
                          >
                            Contact
                          </Button>
                        </ModalFooter>
                      </Modal>
                      <br />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "16pt",
                          color: "black",
                          float: "left"
                        }}
                      >
                        {" "}
                        Skills:{" "}
                      </span>
                      <span style={{ fontSize: "14pt" }}>
                        {dat.skills.split(",").map(skill => (
                          <div
                            style={{
                              borderStyle: "solid",
                              borderWidth: "1px",
                              float: "left",
                              borderRadius: "5px",
                              marginRight: "5px",
                              marginLeft: "5px",
                              padding: "3px",
                              backgroundColor: "#c9ddff"
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </span>{" "}
                      <br />
                      <br />
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "12pt",
                          color: "gray"
                        }}
                      >
                        {" "}
                        Description:{" "}
                      </span>
                      <span style={{ fontSize: "12pt" }}>
                        {dat.description}
                      </span>
                      <br />
                      <hr />
                    </li>
                  </div>
                ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default PostCard;
