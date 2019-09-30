import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext';

class FolderMain extends Component {
  static  contextType = NoteContext;

  render(){
    let noteComponents 
    const notesMapped = this.context.notes.map((note) => {
      const newNotes =   note.filter(note => note.folderId === this.props.match.params.id)
      noteComponents =  newNotes.map((note) => {
        return <Note item = {note} /> 
      })
      return noteComponents
    })   
    console.log("foldermain note components", noteComponents)


    return (        
        <section className="notes">
          {notesMapped}
        </section>
    )
  }
  

}

  

export default FolderMain;