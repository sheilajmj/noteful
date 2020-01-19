import React, { Component } from 'react';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import AddNoteButton from './AddNoteButton';

class SelectedNote extends Component {
  static contextType = NoteContext;

  // getNotesRequest = () => {
  //   console.log("this is in get Notes Request")
  //   fetch('https://frozen-ravine-41788.herokuapp.com/api/notes', {
  //     method: 'GET',
  //     headers: {
  //       'Authorization' : process.env.authorization,
  //       'Accept': 'application/json',
  //       'content-type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(res.status)
  //       }
  //       return res.json()
  //     })
  //     .then((notes) => {
  //       this.context.setNotes(notes)
  //     })
  
  //     .catch(error => this.context.setState({ error }))
  // }
  
  
  deleteNoteRequest = (noteId, callback) => {
    fetch('https://frozen-ravine-41788.herokuapp.com//api/notes/'+ noteId, {
      method: 'DELETE',
      headers: {
        'Authorization' : process.env.authorization,
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


  render() {

      // this.getNotesRequest();
    console.log("this props match params", this.props.match.params)
      const newNotes = this.context.notes.filter(note => note.id === parseInt(this.props.match.params.id))
    console.log("These are new Notes", newNotes)

      const noteComponentsMapped = newNotes.map((note) => {
        return  <div className="note" id = {note.id}> 
          <Link to={`/note/${note.id}`}><h2> {note.name} </h2></Link>
            <div className="noteContent">{note.content}</div>
            <p className="noteModifiedDate">{note.modified}</p>
            <button type="button" value = {note.id}  onClick={() => {
                this.deleteNoteRequest(note.id, this.context.deleteNote)
                }
                }
            > Delete Note</button>
        </div>
      });

      return (
        <section className="selectedNote">
          {noteComponentsMapped}  
          <AddNoteButton />
        </section>
      )

    }
  }

  SelectedNote.propTypes = {
    requiredObjectWithStrictShape: PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.string.isRequired,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  }


  export default withRouter(SelectedNote);