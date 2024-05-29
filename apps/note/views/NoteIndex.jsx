
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { addNote, deleteNote, updateNote, getAllNotes } from '../services/note.service.js'

const { useState } = React


export function NoteIndex() {
    const [notes, setNotes] = useState(getAllNotes())
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedNoteId, setSelectedNoteId] = useState(null) // Assuming you track the ID of the selected note

    const handleAddNote = (newNote) => {
        const updatedNotes = addNote(newNote)
        setNotes(updatedNotes)
    }

    const handleDeleteNote = (id) => {
        const updatedNotes = deleteNote(id)
        setNotes(updatedNotes)
    }

    const handleUpdateNote = (id, newText) => {
        const updatedNotes = updateNote(id, newText)
        setNotes(updatedNotes)
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredNotes = notes.filter((note) => {
        return note.text && note.text.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const handleNoteSelect = (id) => {
        setSelectedNoteId(id)
    }

    return (
        <div className="NoteIndex">
            <h1>MissKeepApp</h1>
            <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={handleSearch}
            />
            {selectedNoteId === null && <NoteForm onAdd={handleAddNote} />}
            <NoteList
                notes={filteredNotes}
                onDelete={handleDeleteNote}
                onUpdate={handleUpdateNote}
                onNoteSelect={handleNoteSelect}
            />
        </div>
    )
}