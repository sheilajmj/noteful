import React, { Component } from 'react';
import Folder from './folder'

class FolderSidebar extends Component {

  render(){
    const folderComponents = this.props.folders.map((folder) => {
      return <Folder  
      folder = {folder} 
      onClick = {this.props.onClick.bind(this)}
       />
    })

    const folderSelection = ((folder) => {
      if (folder.id === this.state.folderSelection){
      return "folders folderSelection"  
      }
      else {
        return "folders"
      }
    })

    return (
        <section className= {folderSelection}>
          {folderComponents}
        </section>
    )
  }
  
}

  

export default FolderSidebar;