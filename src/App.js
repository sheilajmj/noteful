import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import MainSidebar from './mainSidebar';
import FolderSidebar from './folderSidebar';
import NoteSidebar from './noteSidebar';
import MainMain from './mainMain';
import FolderMain from './folderMain';
import NoteMain from './noteMain';
import './sidebar.css';
import './index.css';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: 'loading',
      notes: 'loading',
    }
  }


  setFolders = folders => {
    console.log ('set folders ran')
    this.setState({
      folders: folders,
      error: null,
    })
    console.log("this is set Folders updated state", this.state)
  }

  setNotes = notes => {
    console.log ('set notes ran')
    this.setState({
      notes: notes,
      error: null,
    })
    console.log("this is set Note updated notes", this.state)
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

    console.log('this is state.notes within render', this.state.notes)

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
            <header className='App'>
              <h1>Noteful</h1>
            </header>
            <div className='nav'>
              <div>
                <button onClick={this.props.history.goBack}>Back</button>
              </div>
            </div>
            <NoteContext.Provider value={contextValue}>
              <section className="sidebar">
                <Route
                  exact path='/'
                  component={MainSidebar}
                />
                <Route
                  path='/folder/:id'
                  component={FolderSidebar}
                />
                <Route
                  path='/note/:id'
                  component={NoteSidebar}
                />
                <Route
                  path='/'
                  component={AddFolder}
                />
              </section>
              <section className="main">
                <Route
                  path='/'
                  component={AddNote}
                />
                <Route
                  exact path='/'
                  component={MainMain}
                />
                <Route path='/folder/:id'
                  component={FolderMain}
                />
                <Route
                  path='/note/:id'
                  component={NoteMain}
                />
              </section>
            </NoteContext.Provider>
          </main>
        </div>
      </div>
    )
  }
}

export default withRouter(App);