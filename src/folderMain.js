import React, { Component } from 'react';
import Note from './note'

class FolderMain extends Component {

  render(){

    console.log ("this is this.props.notes", this.props.notes)
    const newNotes =   this.props.notes.filter(this.props.notes.folderId !== this.props.match.params.id)
    const newNoteItems = newNotes.forEach((item) => {
      return ({name: this.item.name,
              content: this.item.content, 
              folderId: this.item.folderId,
              id: this.item.id,
              modified: this.item.modified,})
      })
      console.log ("these are new note items", newNoteItems)      
    
        //    return <Note item = { item } onClick = {this.props.onClick.bind(this)} />
      //  });

  //  //I want to get the notes that have the folderid equal to the params id   - How do I approach this here?//
  //       (this.props.notes.folderId === this.props.match.params.id) {
         
  //         this.props.notes.filter(this.props.notes.folderId !== this.props.match.params.id){
  //           return 
  //         }




    
    // const noteComponents =  this.newNotes.forEach((item) => {
    //   return <Note item = {item} onClick= {this.props.onClick.bind(this)}/> 
    // });
    // console.log ('these are the notes?', noteComponents)
          

    return (        
        <section className="note">
          {/* <Note /> */}
          this is a note
        </section>
    )
  }
  

}

  

export default FolderMain;