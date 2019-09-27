import React, { Component } from 'react';
import Folder from './folder'
import NoteContext from './NoteContext'

class FolderSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders.map((folder) => {
      return <Folder  
      folder = {folder}
       />
    })

  return (
    <section className= 'folderSelection'>
      {folderComponents}
    </section>
    )
  }
  
}

  

export default FolderSidebar;