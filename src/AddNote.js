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
      if (folders.name === newNoteFolder){ 
       getId= (folders.id)
      }
      return getId
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
    this.folders = this.context.folders
    console.log('context folders in add note', this.context.folders)
    this.folderListNames = this.folders.map((folder) => {
      console.log ('this is the folderListNames in AddNote', folder.name)
      return <option value= {folder.name} >{folder.name}</option>
    })

    return (
      <section className="addNote">
        <form className="registration">Add New Note</form>
        <label>Note Name</label>
        <input
          type="text"
          name="newNoteName"
          id="newNoteName"
          placeholder="new note name"
          required
          />
        <label>Note Content</label>
        <input
          type="text"
          name="newNoteContent"
          id="newNoteContent"
          placeholder="new note content"
          required
          />
        <label>Add note to which folder?</label>
        <select
          type="Selection"
          name="newNoteFolder"
          id="newNoteFolder"
          placeholder="new note folder"
        >
        {this.folderListNames}
        </select>
        <button 
          className="addNoteButton"
          for='newNote' 
          type="submit" 
          onClick={e => this.handleSubmit(e)}
        >
          Add Note
        </button>
      </section>

    )
  }
}


export default AddNote;