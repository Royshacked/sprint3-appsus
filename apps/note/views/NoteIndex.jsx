// NoteIndex.jsx
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { addNote, deleteNote, updateNote, getAllNotes } from '../services/note.service.js'

const { useState } = React
const notepadImage = '../../../assets/img/notepad.jpg'

export function NoteIndex() {
    const [notes, setNotes] = useState(getAllNotes())
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    const handleAddNote = (newNote) => {
        const updatedNotes = addNote(newNote)
        setNotes(updatedNotes)
    }

    const handleDeleteNote = (id) => {
        const updatedNotes = deleteNote(id)
        setNotes(updatedNotes)
    }

    const handleUpdateNote = (id, newText, newBackgroundColor) => {
        const updatedNotes = updateNote(id, newText, newBackgroundColor)
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

    const bodyStyle = {
        backgroundImage: `url(${notepadImage})`,
        backgroundSize: 'contain',
        minHeight: '100vh'
    }

    return (
        <div style={bodyStyle}>
            <div className="hero">
                <div className="search-menu">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search notes..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                        <div className="search-buttons">
                        </div>
                    </div>
                <div className="NoteIndex">
                    <h1>MissKeepApp</h1>
                    {selectedNoteId === null && <NoteForm onAdd={handleAddNote} />}
                </div>
                <NoteList
                    notes={filteredNotes}
                    onDelete={handleDeleteNote}
                    onUpdate={handleUpdateNote}
                    onNoteSelect={handleNoteSelect}
                />
            </div>
        </div>
    )
}
