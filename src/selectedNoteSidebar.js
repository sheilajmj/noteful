import React, { Component } from 'react';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddFolderButton from './AddFolderButton';
import { withRouter } from 'react-router-dom';

class SelectedNoteSidebar extends Component {
  static  contextType = NoteContext;
  


  render(){
    const foldersArray = this.context.folders
    console.log("foldersArray", foldersArray)
    const notesArray = this.context.notes 
    console.log("notesArray", notesArray)
    const noteId = parseInt(this.props.match.params.id)
    console.log("noteId", noteId)
    const selectedNote = notesArray.find(note => note.id === noteId)
    console.log("selectedNote", selectedNote)
  const folderIdOfNote = selectedNote.folder_id
  console.log("folderIdOfNote", selectedNote.folder_id)
  const folderOfNote = foldersArray.find(folder => folder.id === folderIdOfNote)
console.log("folderOfNote", folderOfNote)
  return (
    <section className= 'folderSelection'>
      {folderOfNote.name}
      <AddFolderButton />
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