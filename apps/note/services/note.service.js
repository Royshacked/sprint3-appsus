// note service
export const addNote = (notes, text) => {
    const newNote = { id: Date.now(), text }
    return [...notes, newNote]
}
  
export const deleteNote = (notes, id) => {
    return notes.filter((note) => note.id !== id)
}
  
export const updateNote = (notes, id, newText) => {
    return notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
}  