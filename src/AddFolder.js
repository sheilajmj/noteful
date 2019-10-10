import React, { Component } from 'react';
import NoteContext from './NoteContext'

class AddFolder extends Component {
  static  contextType = NoteContext;

  handleSubmit(event) {
    event.preventDefault();
    const newFolderName = document.getElementById("newFolderName").value
    this.handleAddNewFolder(newFolderName)
    document.getElementById("folderForm").reset();
  };



  handleAddNewFolder(folder) {
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


  render() {

    return (
      <section className="addFolder">
        <form className="folderForm" id= "folderForm">
        <label>Add New Folder</label>
        <input
          type="text"
          name="newFolderName"
          id="newFolderName"
          placeholder="new folder name"
          required
        />
        <button htmlFor='newFolderName' type="submit" onClick={e => this.handleSubmit(e)}>Add Folder</button>
        </form>
      </section>

    )
  }
}



export default AddFolder;