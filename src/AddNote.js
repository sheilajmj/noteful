import React, { Component } from 'react';
import { uid } from 'react-uid';
import NoteContext from './NoteContext'

class AddNote extends Component {
  static contextType = NoteContext;
  constructor(props) {
    super(props);
    this.state = {
      addFolder: "",
    };
  }


  handleSubmit(event) {
    event.preventDefault();
    console.log ("this is this.context", this.context)
    const newNoteName = document.getElementById("newNoteName").value
    console.log ('this is newNoteName', newNoteName);
    const newNoteContent = document.getElementById("newNoteContent").value
    console.log ('this is newNoteContent', newNoteContent);
    const newNoteFolder = document.getElementById("newNoteFolder").value;
    console.log ('this is the newNote Folder', newNoteFolder)
    const newNoteFolderInfo = this.context.folders.find((folders) => {
      if (folders.name === newNoteFolder){ 
      return (folders.id)
      }
    });
    const newNoteFolderId = newNoteFolderInfo.id
    console.log ("this is the new note folder id?", newNoteFolderId)  
    const newNoteObject = `{"id": "", "name": "${newNoteName}", "modified": "", "folderId": "${newNoteFolderId}", "content": "${newNoteContent}"}`
    console.log ('this is newNoteObject', newNoteObject)
   
    this.handleAddNewNote(newNoteObject)
  };

  handleAddNewNote(note) {
    console.log("this is note", note);
    const url = 'http://localhost:9090/notes'
    const options = {
      method: "POST",
      body: note,    
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

    return (
      <section className="addNote">
        <form className="registration">Add New Note</form>
        <label>Note Name</label>
        <input
          type="text"
          name="newNoteName"
          id="newNoteName"
          placeholder="new note name"
        />
        <label>Note Content</label>
        <input
          type="text"
          name="newNoteContent"
          id="newNoteContent"
          placeholder="new note content"
        />
        <label>Add note to which folder?</label>
        <input
          type="Selection"
          name="newNoteFolder"
          id="newNoteFolder"
          placeholder="new note folder"
        />
        <button for='newNote' type="submit" onClick={e => this.handleSubmit(e)}>Add Note</button>
      </section>

    )
  }
}


export default AddNote;