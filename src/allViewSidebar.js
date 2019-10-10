import React, { Component } from 'react';
import Folder from './folder';
import NoteContext from './NoteContext';
import PropTypes from 'prop-types';
import AddFolder from './AddFolder';

class AllViewSidebar extends Component {
  static  contextType = NoteContext;
  render(){
    const folderComponents = this.context.folders
    const folderComponentsMapped = folderComponents.map((folder) =>{
        return <Folder  
        folder = {folder}
        key = {folder.id} 
        />
      })
     
    return (
        <div className="folders">
         {folderComponentsMapped}
         <AddFolder />
        </div>
    )  

  };
}
AllViewSidebar.propTypes = {
  requiredObjectWithStrictShape: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })
};

export default AllViewSidebar;