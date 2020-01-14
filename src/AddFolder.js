import React, { Component } from 'react';
import NoteContext from './NoteContext'

class AddFolder extends Component {
  static contextType = NoteContext;
  
  showError(){
    console.log("showError ran")
    // return <div className='folderNameError'>A folder name is required.</div>
    let element = document.getElementById("addFolderError");
    element.classList.remove("hide");
  }
  
  handleSubmit(event) {
    event.preventDefault();
    const newFolderName = document.getElementById("newFolderName").value
    if (document.getElementById("newFolderName").value !== "") {
      this.handleAddNewFolder(newFolderName)
      document.getElementById("folderForm").reset();
      let element = document.getElementById("addFolderError");
      element.classList.add("hide");
      this.props.history.push('/')
    }
    else { 
      this.showError();
      
    }
  }

  handleAddNewFolder(folder) {
    const url = 'https://frozen-ravine-41788.herokuapp.com/api/folders'
    const options = {
      method: "POST",
      body: `{"folder_name": "${folder}"}`,
      headers: {
        'Authorization' : 'Bearer' + process.env.authorization_key,
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
        <div className="addFolderForm">
          <form className="folderForm" id="folderForm">
            <h2> Add New Folder</h2>
            <label>Add folder name (required)</label>
            <input
              type="text"
              name="newFolderName"
              id="newFolderName"
              placeholder="new folder name"
              required
            />
            <div id="addFolderError" className='hide'>A folder name is required.</div>
            <button className="submitAddFolder" htmlFor='newFolderName' type="submit" onClick={e => this.handleSubmit(e)}>Add Folder</button>
          </form>
        </div>
      </section>

    )
  }
}



export default AddFolder;