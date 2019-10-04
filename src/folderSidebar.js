import React, { Component } from 'react';
import Folder from './folder'
import NoteContext from './NoteContext'

class FolderSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders
      const folderComponentsMapped = folderComponents.map((folder) => {
        console.log ('this is folder', folder)
        return <Folder  
        folder = {folder} 
       />
    })


  return (
    <section className= 'folderSelection'>
      {folderComponentsMapped}
    </section>
    )
  }
};
  
  

export default FolderSidebar;