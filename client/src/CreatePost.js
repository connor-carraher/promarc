// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import './createpost.css'

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

  //
  // updateDB = (idToUpdate, updateToApply) => {
  //   let objIdToUpdate = null;
  //   this.state.data.forEach(dat => {
  //     if (dat.id == idToUpdate) {
  //       objIdToUpdate = dat._id;
  //     }
  //   });
  //
  //   axios.post("/api/updateData", {
  //     id: objIdToUpdate,
  //     update: { message: updateToApply }
  //   });
  // };

  render() {
    return (
      <div style={{ height: "80%", paddingTop: "20px" }}>
        <Container
          class=".col-sm-12 .col-md-6 .offset-md-3"
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
                <Label className="input-title" for="skills">Title</Label>
                <Input
                  type="text"
                  name="text"
                  id="title"
                  placeholder="Title..."
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label className="input-title" for="skills">Skills</Label>
                <Input
                  type="text"
                  name="text"
                  id="skills"
                  placeholder="List of skills..."
                  onChange={e => this.setState({ skills: e.target.value })}
                />
              </FormGroup>

              <FormGroup>
                <Label className="input-title" for="description">Description</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="description"
                  placeholder="Enter a description of the project..."
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </FormGroup>

              <Button
                style={{ width: "15%", position: "absolute", left: "85%", bottom: "-18%", backgroundColor: "#069BEE" }}
                onClick={() =>
                  this.putDataToDB(
                    this.state.description,
                    this.state.title,
                    this.state.skills
                  )
                }
                href="/viewpost/"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </div>
      // <div style={{ padding: "10px" }}>
      //   <input
      //     type="text"
      //     style={{ width: "200px" }}
      //     onChange={e => this.setState({ idToDelete: e.target.value })}
      //     placeholder="put id of item to delete here"
      //   />
      //   <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
      //     DELETE
      //   </button>
      // </div>
      // <div style={{ padding: "10px" }}>
      //   <input
      //     type="text"
      //     style={{ width: "200px" }}
      //     onChange={e => this.setState({ idToUpdate: e.target.value })}
      //     placeholder="id of item to update here"
      //   />
      //   <input
      //     type="text"
      //     style={{ width: "200px" }}
      //     onChange={e => this.setState({ updateToApply: e.target.value })}
      //     placeholder="put new value of the item here"
      //   />
      //   <button
      //     onClick={() =>
      //       this.updateDB(this.state.idToUpdate, this.state.updateToApply)
      //     }
      //   >
      //     UPDATE
      //   </button>
      // </div>
    );
  }
}

export default CreatePost;
