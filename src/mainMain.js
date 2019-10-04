import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext'

class MainMain extends Component {
  static  contextType = NoteContext;
  render(){
    const notes = this.context.notes
    const noteItems= notes.map((item)=> {
      return <Note item = {item}/>
  })
  
    return (
        <section className="notes">
           {noteItems}
        </section>
    )
  }
  

}
  

export default MainMain;