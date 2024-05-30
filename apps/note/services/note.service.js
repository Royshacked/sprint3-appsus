// note service
// Load notes from local storage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notesDB')
    const notes = notesJSON ? JSON.parse(notesJSON) : []
    // Ensure each note's files array contains valid file information
    return notes.map(note => ({
        ...note,
        files: note.files.map(file => ({
            ...file,
            url: file.url || URL.createObjectURL(new Blob())
        }))
    }))
}

// Save notes to local storage
const saveNotes = (notes) => {
    localStorage.setItem('notesDB', JSON.stringify(notes))
}

// Add a new note
export const addNote = (note) => {
    const { text, backgroundColor, files } = note
    const filesInfo = files.map(file => ({
        name: file.name,
        type: file.type,
        url: file.url || URL.createObjectURL(file)
    }))
    const newNote = { id: Date.now(), text, backgroundColor, files: filesInfo }
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
            const filesInfo = newFiles.map(file => ({
                name: file.name,
                type: file.type,
                url: file.url || URL.createObjectURL(file)
            }))
            return { ...note, text: newText, backgroundColor: newBackgroundColor, files: filesInfo }
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
