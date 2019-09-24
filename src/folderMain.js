import React, { Component } from 'react';
import Note from './note'

class FolderMain extends Component {

  render(){

    console.log ("this is this.props.notes", this.props.notes)   
    console.log ("check this one:", this.props.match.params.id)

    const newNotes =   this.props.notes.filter(note => note.folderId === this.props.match.params.id)
    console.log ("these are new notes", newNotes)
 
    const noteComponents =  newNotes.map((note) => {
      console.log (note)
      return <Note item = {note} onClick= {this.props.onClick.bind(this)}/> 
    });
    console.log ('these are note components', noteComponents)


    return (        
        <section className="note">
          {noteComponents}
        </section>
    )
  }
  

}

  

export default FolderMain;