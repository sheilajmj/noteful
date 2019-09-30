import React, { Component } from 'react';
import Note from './note'
import NoteContext from './NoteContext'

class MainMain extends Component {
  static  contextType = NoteContext;
  render(){
    const noteComponents = this.context.notes.map((item) => {
      const noteComponentsMapped = item.map((item)=> {
    console.log ("this is an item", item)
      return <Note item = {item}/>
  })
  return noteComponentsMapped
})

    return (
        <section className="notes">
           {noteComponents}
        </section>
    )
  }
  

}
  

export default MainMain;