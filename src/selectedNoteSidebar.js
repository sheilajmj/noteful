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
    const selectedNote = notesArray.find((note) => {
      if (note.id ===  this.props.match.params.id){
        return note
      }
    if (!note){
      return <div>Failed url error</div>
    }
  })

  const folderIdOfNote = selectedNote.folderId
  console.log("folderIdOfNote", selectedNote.folderId)
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