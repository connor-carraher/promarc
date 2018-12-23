// /client/App.js
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Test from './Test'
import axios from "axios";

class CreatePost extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    description: null,
    title: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch("/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (description, title) => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("/api/putData", {
      id: idToBeAdded,
      description: description,
      title: title
    });
  };


  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };


  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

render() {
  const { data } = this.state;
  return (
    <div>
      <ul>
        {data.length <= 0
          ? "NO DB ENTRIES YET"
          : data.map(dat => (
              <li style={{ padding: "10px" }} key={data.title}>
                <span style={{ color: "gray" }}> id: </span> {dat.id} <br />
                <span style={{ color: "gray" }}> data: </span>
                {dat.title}
                {dat.description}
                Hello
              </li>
            ))}
      </ul>
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
        <button onClick={() => this.putDataToDB(this.state.description, this.state.title)}>
          ADD
        </button>
      </div>
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