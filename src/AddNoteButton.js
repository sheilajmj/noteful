import React, { Component } from 'react';
import NoteContext from './NoteContext';

class AddNoteButton extends Component {
    static  contextType = NoteContext;
    render(){     

      return (
          <div className="addNoteButtonWrap">
                    <button className="addNoteButton" onClick={((e) => {this.context.history.push('/addNote')})}>+<br/>Note</button>      
          </div>
      )  
  
    };
  }
  
  export default AddNoteButton;