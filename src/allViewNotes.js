import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddNote from './AddNote';

class AllViewNotes extends Component {
  static contextType = NoteContext;

  render() {
    const notes = this.context.notes
    const noteItems = notes.map((item) => {
      return <Note item={item} key={item.id} />
    })

    return (
      <div className="notes">
        <AddNote />
        {noteItems}
      </div>
    )


  }
}

AllViewNotes.propTypes = {
  requiredObjectWithStrictShape: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })
}


export default AllViewNotes;