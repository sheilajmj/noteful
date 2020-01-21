import React, { Component } from 'react';
import Note from './note';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddNoteButton from './AddNoteButton';

class AllViewNotes extends Component {
  static contextType = NoteContext;

  render() {
    const notes = this.context.notes
    const noteItems = notes.map((item) => {
      return <Note item={item} key={item.id} />
    })

    return (
      <section className="notes">
        <AddNoteButton />
        {noteItems}
      </section>
    )


  }
}

AllViewNotes.propTypes = {
  requiredObjectWithStrictShape: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    folder_id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })
}


export default AllViewNotes;