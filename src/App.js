import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import MainSidebar from './mainSidebar'
import FolderSidebar from './folderSidebar'
import NoteSidebar from './noteSidebar'
import MainMain from './mainMain'
import FolderMain from './folderMain'
import NoteMain from './noteMain'
import './dummy-store'
import dummyStore from './dummy-store';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
      folderSelection: " ",
      noteSelection: " ",
    }
  }


  // onFolderSelect = () => {
  //   console.log("folder selection state changed")
  // }

  // onFolderClick = (event) => {
  //   console.log ("folder click noticed and here is the event", this.props.match.params.folderId)
  //   this.setState({folderSelection: this.props.match.params.folderId})
  // //   const newNotes = 
  // //   this.state.notes.filter(function (item){
  // //     return item.folderId !== event.target.value
  // //   })
  // // this.setState({notes: newNotes}) 
  // }; 

  onDeleteNote = (event) => {
    console.log ("note click noticed")
    this.setState({noteSelection: event.target.value})
    const newNotes = 
      this.state.notes.filter(function (item){
        return item.id !== event.target.value
      })
    this.setState({notes: newNotes})  
  }


  render(){
    // let folderIdPath = this.state.folders.map((folder) => {
    //   return `/folder/:${folder.id}`
    //})

    console.log ('Here is this.state.folder - is it objects in an object?', this.state.folders)

    return (
      <main>
        <header className='App'>
          <h1>Noteful</h1>
        </header>
        <section className="sidebar">
          <Route 
          exact path='/' 
          render = {() =>
            <MainSidebar 
              folders = {this.state.folders} 
              onClick = {this.onFolderClick}
            />}
            />
          <Route 
          path= '/folder/:id'
          render = {() => 
            <FolderSidebar 
            folders = {this.state.folders}
            onClick = {this.onFolderClick}
            />}
           />
          <Route path={`/note/:id`}  
            render = {() =>
              <NoteSidebar/>} />
        </section>
        <section className="main">
          <Route 
            exact path='/' 
            render={(props) =>
            <MainMain 
              notes= {this.state.notes}
              onClick = {this.onDeleteNote}
             />}
           />
          <Route path= '/folder/:id'
            render={(props) => 
            <FolderMain {...props} 
            notes={this.state.notes} 
            onClick = {this.onDeleteNote}/>}
           />
          <Route 
            path={`/note/:id`} 
            render={(props) =>
            <NoteMain 
              notes= {this.state.notes}
            />}
           />
        </section>
      </main>
    )
  }
  
}
