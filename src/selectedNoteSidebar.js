import React, { Component } from 'react';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddFolder from './AddFolder';
import { withRouter } from 'react-router-dom';

class SelectedNoteSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folders = this.context.folders
    const notes = this.context.notes 
    const note = notes.find(note => note.id === this.props.match.params.id)
    if (!note){
      return <div>Failed url error</div>
    }

  const folderIdOfNote = note.folderId
  const folder = folders.find(folder => folder.id === folderIdOfNote)

  return (
    <section className= 'folderSelection'>
      {folder.name}
      <AddFolder />
    </section>
    )

  }

}
SelectedNoteSidebar.propTypes = {
    requiredObjectWithStrictShape: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
}

  

export default withRouter(SelectedNoteSidebar);