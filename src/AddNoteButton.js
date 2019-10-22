import React, { Component } from 'react';
import NoteContext from './NoteContext';
import { Link } from 'react-router-dom'

class AddNoteButton extends Component {
    static  contextType = NoteContext;
    render(){     

      return (
          <div className="addNoteButtonWrap">
            <Link type="button" to={`/addNote`}> 
              + Note
            </Link>
          </div>
      )  
  
    };
  }
  
  export default AddNoteButton;