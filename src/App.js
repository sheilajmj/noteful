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
      error: null,
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

  handleAddFolder = folder => {
    const newFolderArray = this.state.folders.concat(folder)
    this.setFolders(newFolderArray)

  }

  handleAddNote = note => {
    let newNoteArray = this.state.notes.concat(note)
    this.setNotes(newNoteArray)
  }

  componentDidMount() {
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
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

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
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
        <div>Oops nothing here...</div>
      )
    }

    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      history: this.props.history,
      deleteNote: this.deleteNote,
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
    }


    return (
      <div>
        <div className='pageWrap'>
          <main>
            <header className='name'>
              <h1>Noteful</h1>
            </header>
            <div className='backButton'>
              <div>
                <button onClick={this.props.history.goBack}>Back</button>
              </div>
            </div>
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
              </div>
            </NoteContext.Provider>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(App);