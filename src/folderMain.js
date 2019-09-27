import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext'

class FolderMain extends Component {
  static  contextType = NoteContext;
  render(){

    const newNotes =   this.context.notes.filter(note => note.folderId === this.props.match.params.id)

    const noteComponents =  newNotes.map((note) => {
      return <Note item = {note} /> 
    });

    return (        
        <section className="note">
          {noteComponents}
        </section>
    )
  }
  

}

  

export default FolderMain;