import React, { Component } from 'react';
import Folder from './folder';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddFolderButton from './AddFolderButton';

class FolderSpecificSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders
      const folderComponentsMapped = folderComponents.map((folder) => {
        return <Folder  
        folder = {folder} 
        key = {folder.id}
       />
    })



  return (
    <section className= 'folderSelection'>
      {folderComponentsMapped}
      <AddFolderButton />
    </section>
    )
  }
};
  
FolderSpecificSidebar.propTypes = {
  requiredObjectWithStrictShape: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
}


export default FolderSpecificSidebar;