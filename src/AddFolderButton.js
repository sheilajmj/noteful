import React, { Component } from 'react';
import NoteContext from './NoteContext';
import { Link } from 'react-router-dom'

class AddFolderButton extends Component {


    static  contextType = NoteContext;
    render(){   
      return (
          <div className="addFolderButtonWrap">
            <button className="addFolderButton" onClick={((e) => {this.context.history.push('/addFolder')})}>+<br/>Folder</button>      
          </div>
      )  
  
    };
  }
  
  export default AddFolderButton;