import React, { Component } from 'react';
import NoteContext from './NoteContext'

class AddFolder extends Component {
  static  contextType = NoteContext;

  handleSubmit(event) {
    event.preventDefault();
    const newFolderName = document.getElementById("newFolderName").value
    this.handleAddNewFolder(newFolderName)
  };

  handleAddNewFolder(folder) {
    console.log ("this is folder", folder);
    const url = 'http://localhost:9090/folders'
    const options = {
      method: "POST",
      body: `{"name": "${folder}"}`,
      headers: {
        "Content-Type": "application/json",
      }
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later');
        }
        return res.json();
      })
      .then(data => {
        this.context.handleAddFolder(data);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  validateNameInput(){

  }


  render() {

    return (
      <section className="addFolder">
        <form className="registration"></form>
        <label>Add New Folder</label>
        <input
          type="text"
          name="newFolderName"
          id="newFolderName"
          placeholder="new folder name"
          required
        />
        <button for='newFolderName' type="submit" onClick={e => this.handleSubmit(e)}>Add Folder</button>
      </section>

    )
  }
}



export default AddFolder;