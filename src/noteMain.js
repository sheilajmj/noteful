import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';

class NoteMain extends Component {
  static  contextType = NoteContext;
  render(){
    const notes = this.context.notes
    const newNotes =   notes.filter(note => note.id === this.props.match.params.id)
    const noteComponentsMapped =  newNotes.map((note) => {
        return <Note item = {note} /> 
      });
 

    return (        
        <section className="note">       
           {noteComponentsMapped}
        </section>
    )
  }
  

}

  

export default NoteMain;