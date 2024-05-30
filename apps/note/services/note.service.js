// note service
// Load notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notesDB')
    return notesJSON ? JSON.parse(notesJSON) : []
}

// Save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notesDB', JSON.stringify(notes))
}

// Add a new note
export const addNote = (note) => {
    const newNote = { id: Date.now(), ...note }
    const notes = loadNotes()
    const updatedNotes = [...notes, newNote]
    saveNotes(updatedNotes)
    return updatedNotes
}

// Delete a note by ID
export const deleteNote = (id) => {
    const notes = loadNotes()
    const updatedNotes = notes.filter((note) => note.id !== id)
    saveNotes(updatedNotes)
    return updatedNotes
}

// Update a note by ID
export const updateNote = (id, newText, newBackgroundColor, newFiles) => {
    const notes = loadNotes()
    const updatedNotes = notes.map((note) => {
        if (note.id === id) {
            return { ...note, text: newText, backgroundColor: newBackgroundColor, files: newFiles }
        } else {
            return note
        }
    })
    saveNotes(updatedNotes)
    return updatedNotes
}

// Get all notes
export const getAllNotes = () => {
    return loadNotes()
}
