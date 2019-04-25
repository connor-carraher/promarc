// /client/App.js
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
      createdBy: "",
      updatedAt: "",
      searchTerms: []
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

  incrementFlag = id => {
    axios.post("/api/post/flag/" + id);
    window.location.reload();
  };

  getDataFromDb = () => {
    fetch("/api/posts")
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

  matchTerm = skills => {
    var splitSkills = skills.split(",");

    if (
      (this.state.searchTerms.length == 1 && this.state.searchTerms == "") ||
      this.state.searchTerms.length == 0
    ) {
      return true;
    }

    for (var i = 0; i < splitSkills.length; i++) {
      for (var j = 0; j < this.state.searchTerms.length; j++) {
        if (
          splitSkills[i].toUpperCase().trim() ==
          this.state.searchTerms[j].toUpperCase().trim()
        ) {
          return true;
        }
      }
    }
    return false;
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <Form className="searchBar">
          <div>
            <FormGroup>
              <Label id="searchBarLabel" for="searchBar">
                Search for skills:
              </Label>
              <Input
                type="text"
                name="searchBar"
                id="searchBar"
                placeholder="Skills..."
                onChange={e =>
                  this.setState({ searchTerms: e.target.value.split(",") })
                }
              />
            </FormGroup>
          </div>
        </Form>
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
                  {this.matchTerm(dat.skills) ? (
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
                                to="/"
                              >
                                Delete
                              </Button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment> </React.Fragment>
                          )}
                          {this.state.user._id != this.state.createdBy ? (
                            <React.Fragment>
                              <Button
                                tag={Link}
                                className="modalButton"
                                onClick={() => this.createConversation()}
                                to="/inbox/0"
                              >
                                Contact
                              </Button>

                              <Button
                                tag={Link}
                                className="modalButton"
                                onClick={() =>
                                  this.incrementFlag(this.state.modalId)
                                }
                                to="/#"
                              >
                                Flag as Inappropriate
                              </Button>
                            </React.Fragment>
                          ) : (
                            <React.Fragment> </React.Fragment>
                          )}
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
                      <span style={{ fontSize: "12pt" }}>
                        {dat.description}
                      </span>
                      <br />
                      <span className="headerSmall">Date: </span>
                      <span style={{ fontSize: "12pt" }}>
                        {dat.updatedAt.substring(0, 10)}
                      </span>
                      <br />
                      <hr />
                    </li>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}
export default PostCard;
