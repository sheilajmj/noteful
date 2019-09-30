import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import MainSidebar from './mainSidebar'
import FolderSidebar from './folderSidebar'
import NoteSidebar from './noteSidebar'
import MainMain from './mainMain'
import FolderMain from './folderMain'
import NoteMain from './noteMain'
import './sidebar.css';
import './index.css';
import NoteContext from './NoteContext'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [ ],
      notes: [ ],
    }
  }


  setFolders = folders => {
    this.setState({
      folders: [folders],
      error: null,
    })
  }

  setNotes = notes => {
    this.setState({
      notes: [notes],
      error: null,
    })
  }

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(note =>
      note.id !== noteId
    )
    this.setState({
      note: newNotes
    })
  }

  componentDidMount(){
    
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
        this.setState({
          folders: [folders],
          error: null,
        })
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
          this.setState({
            notes: [notes],
            error: null,
          })
        })

        .catch(error => this.setState({ error }))
    }
  
  render(){    
    
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      history: this.props.history,
      deleteNote: this.deleteNote,
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
            component= {MainSidebar} 
            />
            <Route 
            path= '/folder/:id'
            component= {FolderSidebar}
            />
            <Route 
              path= '/note/:id' 
              component= {NoteSidebar}
            />
          </section>
          <section className="main">
            <Route 
              exact path='/' 
              component= {MainMain}
            />
            <Route path= '/folder/:id'
            component= {FolderMain} 
            />
            <Route 
              path= '/note/:id' 
              component= {NoteMain}
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