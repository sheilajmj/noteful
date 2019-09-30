import React, { Component } from 'react';
import Folder from './folder'
import NoteContext from './NoteContext'

class FolderSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders.map((folder) => {
      const folderComponentsMapped = folder.map((folder) => {
        console.log ('this is folder', folder)
        return <Folder  
        folder = {folder} 
       />
    })
    return folderComponentsMapped
  })

  return (
    <section className= 'folderSelection'>
      {folderComponents}
    </section>
    )
  }
};
  
  

export default FolderSidebar;