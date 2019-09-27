import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext'

class MainMain extends Component {
  static  contextType = NoteContext;
  render(){
    const noteComponents = this.context.notes.map((item) => {
      return <Note item = {item}/>
  })
  
    return (
        <section className="folders">
           {noteComponents}
        </section>
    )
  }
  

}
  

export default MainMain;