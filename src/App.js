import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import MainSidebar from './mainSidebar'
import FolderSidebar from './folderSidebar'
import NoteSidebar from './noteSidebar'
import MainMain from './mainMain'
import FolderMain from './folderMain'
import NoteMain from './noteMain'
import './dummy-store'
import dummyStore from './dummy-store';
import './sidebar.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes,
      folderSelection: " ",
      noteSelection: " ",
    }
  }


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

    return (
      <body>
      <div className='pageWrap'>
      <main>
        <header className='App'>
          <h1>Noteful</h1>
        </header>
        <div className='nav'>
          <div>
            <button onClick={this.props.history.goBack}>Back</button>
          </div>
        </div>
        <section className="sidebar">
          <Route 
          exact path='/' 
          render = {() =>
            <MainSidebar 
              folders = {this.state.folders} 
              onClick = {this.onFolderClick}
              history= {this.props.history}
            />}
            />
          <Route 
          path= '/folder/:id'
          render = {() => 
            <FolderSidebar 
            folders = {this.state.folders}
            onClick = {this.onFolderClick}
            history={this.props.history}
            />}
           />
          <Route path= '/note/:id' 
            render = {() =>
              <NoteSidebar/>}
              folders = {this.state.folders}
              onClick = {this.onFolderClick}
              history={this.props.history} />
        </section>
        <section className="main">
          <Route 
            exact path='/' 
            render={(props) =>
            <MainMain 
              notes= {this.state.notes}
              onClick = {this.onDeleteNote}
              history={this.props.history} 
             />}
           />
          <Route path= '/folder/:id'
            render={(props) => 
            <FolderMain 
              {...props} 
              notes={this.state.notes} 
              onClick = {this.onDeleteNote}
              history={this.props.history} />}
           />
          <Route 
            path= '/note/:id' 
            render={(props) =>
            <NoteMain 
              {...props} 
              notes= {this.state.notes}
              onClick = {this.onDeleteNote}
              history={this.props.history} 
            />}
           />
        </section>
      </main>
      </div>
      </body>
    )
  }
  
}
export default withRouter(App);