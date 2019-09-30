import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';

class NoteMain extends Component {
  static  contextType = NoteContext;
  render(){
    const noteComponents = this.context.notes.map((item) => {
      const newNotes =   item.filter(note => note.id === this.props.match.params.id)
      const noteComponentsMapped =  newNotes.map((note) => {
        return <Note item = {note} /> 
      });
      return noteComponentsMapped
  })

    return (        
        <section className="note">       
           {noteComponents}
        </section>
    )
  }
  

}

  

export default NoteMain;