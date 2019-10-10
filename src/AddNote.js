import React, { Component } from 'react';
import NoteContext from './NoteContext';

class AddNote extends Component {
  static contextType = NoteContext;

  handleSubmit(event) {
    event.preventDefault();
    const newNoteName = document.getElementById("newNoteName").value
    const newNoteContent = document.getElementById("newNoteContent").value
    const newNoteFolder = document.getElementById("newNoteFolder").value;
    let getId = ""
    const newNoteFolderInfo = this.context.folders.find((folders) => {
      if (folders.name === newNoteFolder) {
        getId = (folders.id)
      }
      return getId
    });
    const modifiedOn = document.lastModified
    const newNoteFolderId = newNoteFolderInfo.id
    const newNoteObject = { "id": this.context.notes.length + newNoteName, "name": newNoteName, "modified": modifiedOn, "folderId": newNoteFolderId, "content": newNoteContent }
    this.handleAddNewNote(newNoteObject)
    document.getElementById("newNoteForm").reset();
  };



  handleAddNewNote(note) {
    console.log("this is note", note);
    const url = 'http://localhost:9090/notes'
    const options = {
      method: "POST",
      body: JSON.stringify(note),
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
      <section className="addNote">
        <form className="newNoteForm" id= "newNoteForm">
          <h2>Add New Note</h2>
          <label>Note Name</label>
          <input
            type="text"
            name="newNoteName"
            id="newNoteName"
            placeholder="new note name"
            required
          />
          <br />
          <label>Note Content</label>
          <input
            type="text"
            name="newNoteContent"
            id="newNoteContent"
            placeholder="new note content"
            required
          />
          <br />
          <label>Add note to which folder?</label>
          <select
            type="Selection"
            name="newNoteFolder"
            id="newNoteFolder"
            placeholder="new note folder"
          >
            {this.folderListNames}
          </select>
          <br />
          <button
            className="addNoteButton"
            htmlFor='newNote'
            type="submit"
            onClick={e => this.handleSubmit(e)}
          >
            Add Note
        </button>
        </form>
      </section>

    )
  }
}


export default AddNote;