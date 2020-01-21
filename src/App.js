import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import './sidebar.css';
import './index.css';
import NoteContext from './NoteContext';
import AllView from './allView';
import FolderView from './folderView';
import NoteView from './noteView';
import ErrorBoundary from './errorBoundary';
import AddFolder from './AddFolder';
import AddNote from './AddNote';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: 'loading',
      notes: 'loading',
      hasError: 'false',
    }
  }


  setFolders = folders => {
    this.setState({
      folders: folders,
      error: null,
    })
  }

  setNotes = notes => {
    this.setState({
      notes: notes,
      error: null
    })
  }

  deleteNote = noteId => {
    if (this.state.notes === 'loading') {
      throw new Error('tried to delete a note while notes are loading')
    }
    const notes = this.state.notes;
    const newNoteList = notes.filter(note => note.id !== noteId)
    this.setNotes(newNoteList)
  }

  deleteFolder = folder_id => {
    if (this.state.folders === 'loading'){
      throw new Error ('tried to delete a folder while folders are loading')
    }
    const folders = this.state.folders;
    const newFolderList = folders.filter(folder => folder.id !== folder_id)
    this.setFolders(newFolderList);
  }

  handleAddFolder = folder => {
    const newFolderArray = this.state.folders.concat(folder)
    this.setFolders(newFolderArray)

  }

  handleAddNote = note => {
    const noteForState = {
      id: parseInt(note.id),
      name: note.note_name,
      content: note.note_content,
      folder_id: note.folder_id
    }
    let newNoteArray = this.state.notes.concat(noteForState)
    this.setNotes(newNoteArray)
    this.props.history.push('/');
  }

  componentDidMount() {
    fetch('https://frozen-ravine-41788.herokuapp.com/api/folders', {
      method: 'GET',
      headers: {
        'Authorization' : process.env.authorization,
        'Accept': 'application/json',
        'content-type': 'application/json',

      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((folders) => {
        this.setFolders(folders)
      })
      .catch(error => this.setState({ error }))

    fetch('https://frozen-ravine-41788.herokuapp.com/api/notes', {
      method: 'GET',
      headers: {
        'Authorization' : process.env.authorization,
        'Accept': 'application/json',
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status)
        }
        return res.json()
      })
      .then((notes) => {
        this.setNotes(notes);
      })

      .catch(error => this.setState({ error }))
  }

  render() {
    if (this.state.notes === 'loading' || this.state.folders === 'loading') {
      return (
        <div>Oops!  The notes and folders are still loading!</div>
      )
    }

    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      history: this.props.history,
      deleteNote: this.deleteNote,
      deleteFolder: this.deleteFolder,
      handleAddNote: this.handleAddNote,
      handleAddFolder: this.handleAddFolder,
      setNotes: this.setNotes
    }


    return (
      <div>
        <div className='pageWrap'>
          <header className='name'>
            <h1>Noteful</h1>
          </header>
          <nav>
            <button className="backButton" onClick={this.props.history.goBack}>Back</button>
          </nav>
          <main>
            <NoteContext.Provider value={contextValue}>
              <div className="view">
                <ErrorBoundary>
                  <Route
                    exact path='/'
                    component={AllView}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Route
                    path='/folder/:id'
                    component={FolderView}
                  />
                </ErrorBoundary>
                <ErrorBoundary>
                  <Route
                    path='/note/:id'
                    component={NoteView}
                  />
                </ErrorBoundary>
                <ErrorBoundary>  
                  <Route
                    path='/addFolder'
                    component={AddFolder}
                    />
                    <Route
                    path='/addNote'
                    component={AddNote}
                    />
                </ErrorBoundary>
              </div>
            </NoteContext.Provider>
          </main>
        </div>
      </div >
    )
  }
}

export default withRouter(App);