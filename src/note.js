import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import NoteContext from './NoteContext'

function deleteNoteRequest(noteId, callback) {
    fetch('http://localhost:9090/notes/'+ noteId, {
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
  static  contextType = NoteContext;
   render(){
    const noteItem = this.props.item

    return (
      <NoteContext.Consumer>
      {(context) => (
        <section className="note" id = {noteItem.id} key = {noteItem.id}> 
          <Link to={`/note/${noteItem.id}`}><h2> {noteItem.name} </h2></Link>
            <p>{noteItem.content}</p>
            <h3>{noteItem.modified}</h3>
           
            <button type="button" value = {noteItem.id}  onClick={() => {
                deleteNoteRequest(noteItem.id, this.context.deleteNote)
                }
                }
            > Delete Note</button>
        </section>
      )}
      </NoteContext.Consumer>
    ) 
  }
}
  



  

export default Note;