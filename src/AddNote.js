import React, { Component } from 'react';
import NoteContext from './NoteContext';

class AddNote extends Component {
  static contextType = NoteContext;

  showError() {
    console.log("showError ran")
    // return <div className='folderNameError'>A folder name is required.</div>
    let element = document.getElementById("addNoteError");
    element.classList.remove("hide");
  }

  handleSubmit(event) {
    event.preventDefault();
    const newNoteName = document.getElementById("newNoteName").value
    const newNoteContent = document.getElementById("newNoteContent").value
    const newNoteFolder = document.getElementById("newNoteFolder").value;
    if (newNoteName !== "" && newNoteContent !== "") {
      let getId = ""
      const newNoteFolderInfo = this.context.folders.find((folders) => {
        if (folders.name === newNoteFolder) {
          getId = (folders.id)
        }
        return getId
      });
      const newNoteFolderId = newNoteFolderInfo.id
      const newNoteObject = { "note_name": newNoteName, "note_content": newNoteContent,  "folder_id": newNoteFolderId, }
      this.handleAddNewNote(newNoteObject)
      document.getElementById("newNoteForm").reset();
      let element = document.getElementById("addNoteError")
      element.classList.add('hide');
      this.props.history.push('/')
    }
    else {
      return this.showError();
    }
  }


  handleAddNewNote(note) {
    const url = 'https://frozen-ravine-41788.herokuapp.com/api/notes'
    const options = {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        'Authorization' : `Bearer + ${process.env.authorization-key}`,
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
        this.context.handleAddNote(note);
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }




  render() {
    this.folders = this.context.folders
    this.folderListNames = this.folders.map((folder) => {
      return <option value={folder.name} key={folder.id} >{folder.name}</option>
    })

    return (
      <div className="addNote">
        <form className="newNoteForm" id="newNoteForm">
          <h2>Add New Note</h2>
          <label>Note Name (name required)</label>
          <input
            type="text"
            name="newNoteName"
            id="newNoteName"
            placeholder="new note name"
            required
          />
          <br />
          <label>Note Content (content required)</label>
          <input
            type="text"
            name="newNoteContent"
            id="newNoteContent"
            placeholder="new note content"
            required
          />
          <br />
          <label>Add note to which folder? (selection required)</label>
          <select
            type="Selection"
            name="newNoteFolder"
            id="newNoteFolder"
            placeholder="new note folder"
            required
          >
            {this.folderListNames}
          </select>
          <br />
          <div id="addNoteError" className="hide">A note name and note content are required.</div>
          <button
            className="addNoteButton"
            htmlFor='newNote'
            type="submit"
            onClick={e => this.handleSubmit(e)}
          >
            Add Note
        </button>
        </form>
      </div>

    )
  }
}


export default AddNote;