import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddNote from './AddNote';
import { withRouter } from 'react-router-dom';

class SelectedNote extends Component {
  static  contextType = NoteContext;
  render(){
    const notes = this.context.notes
    const newNotes =   notes.filter(note => note.id === this.props.match.params.id)
    const noteComponentsMapped =  newNotes.map((note) => {
        return <Note item = {note} /> 
      });

     return (        
        <section className="note"> 
          <AddNote />
          {noteComponentsMapped}
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