import React from 'react'

const NoteContext = React.createContext({
  notes: [],
  addNote: () => {},
  deleteNote: () => {},
})

export default NoteContext