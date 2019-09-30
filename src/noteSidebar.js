import React, { Component } from 'react';
import Folder from './folder'
import NoteContext from './NoteContext'

class NoteSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders.map((folder) => {
      const newFolder = folder.filter(folder => folder.id === this.props.match.params.id)
      console.log ("this is new folder", newFolder)
      const folderComponentsMapped = newFolder.map((folder) => {
        if (folder.id === this.props.match.params.id){
        return <Folder  
        folder = {folder} 
       />
      }
    })
    return folderComponentsMapped
  })
  
  return (
    <section className= 'folderSelection'>
      {folderComponents}
    </section>
    )
  }

}

  

export default NoteSidebar;