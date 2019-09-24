import React, { Component } from 'react';
import Note from './note'

class NoteMain extends Component {

  render(){
    const newNotes =   this.props.notes.filter(note => note.id === this.props.match.params.id)
    const noteComponents =  newNotes.map((note) => {
      return <Note item = {note} onClick= {this.props.onClick.bind(this)}/> 
    });

    return (        
        <section className="note">       
           {noteComponents}
        </section>
    )
  }
  

}

  

export default NoteMain;