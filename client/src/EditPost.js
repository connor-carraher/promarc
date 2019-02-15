// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./createpost.css";

class EditPost extends Component {
  componentDidMount() {
    this.setState({ id: this.props.match.params.id });
    this.getPostFromDb();
  }

  state = {
    id: null,
    description: null,
    title: null,
    skills: null
  };

  getPostFromDb = () => {
    fetch(`/api/post/${this.props.match.params.id}`)
      .then(data => data.json())
      .then(res =>
        this.setState({
          description: res.data.description,
          title: res.data.title,
          skills: res.data.skills
        })
      );
  };

  updatePost = (description, title, skills) => {
    axios.post("/api/post/edit/" + this.state.id, {
      id: this.state.id,
      update: { description: description, title: title, skills: skills }
    });
  };

  render() {
    return (
      <div style={{ height: "80%", paddingTop: "20px" }}>
        <Container
          className=".col-sm-12 .col-md-6 .offset-md-3"
          style={{
            backgroundColor: "#f2f2f2",
            height: "100%",
            padding: "20px",
            borderRadius: "15px",
            position: "relative"
          }}
        >
          <Form>
            <div>
              <FormGroup>
                <Label className="input-title" for="skills">
                  Title
                </Label>
                <Input
                  type="text"
                  name="text"
                  id="title"
                  value={this.state.title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label className="input-title" for="skills">
                  Skills
                </Label>
                <Input
                  type="text"
                  name="text"
                  id="skills"
                  value={this.state.skills}
                  onChange={e => this.setState({ skills: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label className="input-title" for="description">
                  Description
                </Label>
                <Input
                  type="textarea"
                  name="text"
                  id="description"
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </FormGroup>

              <Button
                style={{
                  width: "15%",
                  position: "absolute",
                  left: "85%",
                  bottom: "-18%",
                  backgroundColor: "#069BEE"
                }}
                onClick={() =>
                  this.updatePost(
                    this.state.description,
                    this.state.title,
                    this.state.skills
                  )
                }
                href="/"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default EditPost;
