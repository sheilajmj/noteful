import React, { Component } from 'react';
import Folder from './folder'
import NoteContext from './NoteContext'

class NoteSidebar extends Component {
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
    </section>
    )
  }

}

  

export default NoteSidebar;