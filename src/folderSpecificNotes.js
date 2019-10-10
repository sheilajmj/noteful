import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddNote from './AddNote';
import { withRouter } from 'react-router-dom';

class FolderSpecificNotes extends Component {
  static  contextType = NoteContext;

  render(){  
    const notes= this.context.notes
    console.log ('these are props', this.props)
    const newNotes =   notes.filter(note => note.folderId === this.props.match.params.id)
    const noteComponents =  newNotes.map((note) => {
      return <Note item = {note} key = {note.id} /> 
    })


  
    return (        
        <section className="notes">
          <AddNote />
          {noteComponents}
        </section>
    )
  }
}

    FolderSpecificNotes.propTypes = {
      requiredObjectWithStrictShape: PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modified: PropTypes.string.isRequired,
        folderId: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    }

  
export default withRouter(FolderSpecificNotes);