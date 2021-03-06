import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NoteContext from './NoteContext';


class Folder extends Component {
  static contextType = NoteContext;

  handleRemoveFolder(folder_id, callback){
    fetch('https://frozen-ravine-41788.herokuapp.com/api/folders/'+ folder_id, {
        method: 'DELETE',
        headers: {
          'Authorization' : process.env.authorization,
          'content-type': 'application/json'
        },
      })
      
        .then(res => {
          if (!res.ok) {
            // get the error message from the response,
            return res.json().then(error => {
              // then throw it
              throw error
            })
          }
          // return res.json()
        })
        .then(data => {
          // call the callback when the request is successful
          // this is where the App component can remove it from state
          callback(folder_id)
        })
        .catch(error => {
          console.error(error)
        })
      }


  render(){
    const folder = this.props.folder
    return (
        <NoteContext.Consumer>
        {(context) => (
        <div className="folder" id = {folder.id} key={folder.id}>      
            <Link to={`/folder/${ folder.id }`}> 
              {folder.name}  
            </Link>
            <button className="removeFolderX" value={folder.id} onClick={(e) =>this.handleRemoveFolder(folder.id, this.context.deleteFolder)}>X</button>
        </div>
        )}
        </NoteContext.Consumer>
    )
  }    

}

  

export default Folder;