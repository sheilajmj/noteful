import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext';

class FolderMain extends Component {
  static  contextType = NoteContext;

  render(){
  
    const notes= this.context.notes
    const newNotes =   notes.filter(note => note.folderId === this.props.match.params.id)
    const noteComponents =  newNotes.map((note) => {
      return <Note item = {note} /> 
    })
  
    return (        
        <section className="notes">
          {noteComponents}
        </section>
    )
  }
  

}

  

export default FolderMain;