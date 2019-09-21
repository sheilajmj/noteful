import React, { Component } from 'react';
import Folder from './folder'

class MainSidebar extends Component {

  render(){
    const folderComponents = this.props.folders.map((folder) => {
      return <Folder  
      folder = {folder} 
      onClick = {this.props.onClick.bind(this)}
       />
  })
    return (
        <section className="folders">
         {folderComponents}
        </section>
    )
  }
  

}

  

export default MainSidebar;