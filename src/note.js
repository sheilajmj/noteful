import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from './NoteContext'

function deleteNoteRequest(noteId, callback) {
    fetch('http://localhost:9090//notes/'+ noteId, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
    
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        // call the callback when the request is successful
        // this is where the App component can remove it from state
        callback(noteId)
      })
      .catch(error => {
        console.error(error)
      })
    }

class Note extends Component {
   render(){
    const item = this.props.item
    console.log ('this is the note item', this.props.item)
    return (
      <NoteContext.Consumer>
      {(context) => (
        <section className="note" id = {item.id} key = {item.id}> 
          <Link to={`/note/${item.id}`}><h2> {item.name} </h2></Link>
            <p>{item.content}</p>
            <h3>{item.modified}</h3>
           
            <button type="button" value = {item.id}  onClick={() => {
                deleteNoteRequest(
                  item.id,
                  context.deleteNote)}}> Delete Note</button>
        </section>
      )}
      </NoteContext.Consumer>
    ) 
  }
}
  



  

export default Note;