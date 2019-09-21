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
      folderSelection:" ",
      noteSelection: " ",
    }
  }

  // onFolderSelect = () => {
  //   console.log("folder selection state changed")
  // }

  onFolderClick = (event) => {
    console.log ("folder click noticed and here is the event", event.target.value)
    this.setState({folderSelection: event.target.value})
  //   const newNotes = 
  //   this.state.notes.filter(function (item){
  //     return item.id !== event.target.value
  //   })
  // this.setState({notes: newNotes}) 
  }; 

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
    let folderIdPath = this.state.folders.map((folder) => {
      return `/folder/${folder.id}`
    })
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
          path= {folderIdPath}
          render = {() => 
            <FolderSidebar 
            folders = {this.state.folders}/>}
           />
          <Route path={`/note/${this.state.notes.id}`}  component={NoteSidebar} />
        </section>
        <section className="main">
          <Route 
            exact path='/' 
            render={() =>
            <MainMain 
              notes= {this.state.notes}
              onClick = {this.onDeleteNote}
             />}
           />
          <Route path={folderIdPath} 
            render={() =>
            <FolderMain 
              notes= {this.state.notes}
             />}
           />
          <Route 
            path={`/note/${this.state.notes.id}`} 
            render={() =>
            <NoteMain 
              notes= {this.state.notes}
             />}
           />
        </section>
      </main>
    )
  }
  
}
