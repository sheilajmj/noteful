import React, { Component } from 'react';
import NoteContext from './NoteContext';
import ValidationErrors from './validationError';

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

    function updateNameInput(name){
      nameInput = name
      nameInputTouched = true
      console.log('this is nameInput',nameInput)
    }
    function updateContentInput(content){
      contentInput = content
      contentInputTouched = true
      console.log(contentInput)
    }

    let nameInput= "loading"
    let nameInputTouched = false
    let contentInput= "loading"
    let contentInputTouched = false

    
    const nameInputError= validateNameInput(nameInput)
    console.log ('this is nameinputerror', nameInputError)
    const contentInputError= validateContentInput(contentInput)
 

    function validateNameInput(name){
      console.log ('this is name in the validateNameInput function', name )
      if (name.length === 0){
        return "A new note must have a name"
      }
      else if (name.length > 72){
        return "The note name must be less than 72 characters"
      }
    }
  
    function validateContentInput(content){
      if (content.length === 0){
        return "A new note must have content"
      }
    }
  
    
    return (
      <section className="addNote">
        <form className="registration">Add New Note</form>
        <label>Note Name</label>
        <input
          type="text"
          name="newNoteName"
          id="newNoteName"
          placeholder="new note name"
          onChange= {e => updateNameInput(e.target.value)}
        />
        {this.nameInputTouched && (
          <ValidationErrors message = {nameInputError} />
        )}
        <label>Note Content</label>
        <input
          type="text"
          name="newNoteContent"
          id="newNoteContent"
          placeholder="new note content"
          onChange= {e => updateNameInput(e.target.value)}
        />
        {this.contentInputTouched && (
          <ValidationErrors message = {contentInputError} />
        )}

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
          disabled={
           validateNameInput(nameInput) ||
           validateContentInput(contentInput)
          }
        >
          Add Note
        </button>
      </section>

    )
  }
}


export default AddNote;