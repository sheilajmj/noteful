import React, { Component } from 'react';
import Note from './note'

class FolderMain extends Component {

  render(){
    const newNotes = this.props.notes.filter(note => note.folderId !== this.props.match.params.path) 
    console.log ('will this log?' + this.props.match.params.url)
    const noteComponents =  newNotes.map((item) => {
      return <Note item = {item} onClick= {this.props.onClick.bind(this)}/> 
    });
          

    return (        
        <section className="note">
          {noteComponents}
        </section>
    )
  }
  

}

  

export default FolderMain;