// /client/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Test from './Test'
import axios from "axios";
import PostCard from './PostCard'
import { Button } from 'reactstrap'

class CreatePost extends Component {
  state = {
    data: [],
    description: null,
    title: null,
  };

  putDataToDB = (description, title) => {
    axios.post("/api/putData", {
      description: description,
      title: title
    });
  };

  // deleteFromDB = idTodelete => {
  //   let objIdToDelete = null;
  //   this.state.data.forEach(dat => {
  //     if (dat.id == idTodelete) {
  //       objIdToDelete = dat._id;
  //     }
  //   });
  //
  //   axios.delete("/api/deleteData", {
  //     data: {
  //       id: objIdToDelete
  //     }
  //   });
  // };
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
  const { data } = this.state;
  return (
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange={e => this.setState({ title: e.target.value })}
          placeholder="Title"
          style={{ width: "200px" }}
        />
        <input
          type="text"
          onChange={e => this.setState({ description: e.target.value })}
          placeholder="Post Description"
          style={{ width: "200px" }}
        />
        <Button onClick={() => this.putDataToDB(this.state.description, this.state.title)} href="/viewpost/">
          ADD
        </Button>
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

export default CreatePost
