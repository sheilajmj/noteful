import React, { Component } from 'react';
import NoteContext from './NoteContext';
import { Link } from 'react-router-dom'

class AddFolderButton extends Component {
    static  contextType = NoteContext;
    render(){     

      return (
          <div className="addFolderButtonWrap">
            <Link className="addFolderButton" type="button" to={`/addFolder`}> 
              + Folder
            </Link>
          </div>
      )  
  
    };
  }
  
  export default AddFolderButton;