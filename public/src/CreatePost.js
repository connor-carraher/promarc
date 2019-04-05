// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "./createpost.css";

class CreatePost extends Component {
  state = {
    description: null,
    title: null,
    skills: null
  };

  putDataToDB = (description, title, skills) => {
    axios.post("/api/putData", {
      description: description,
      title: title,
      skills: skills
    });
  };

  render() {
    return (
      <div
        style={{
          height: "80%",
          paddingTop: "20px",
          backgroundColor: "#DAE0E6"
        }}
      >
        <Container class=".col-sm-12 .col-md-6 .offset-md-3 bigContainer">
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
                  placeholder="Title..."
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
                  placeholder="List of skills..."
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
                  placeholder="Enter a description of the project..."
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
                  this.putDataToDB(
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

export default CreatePost;
