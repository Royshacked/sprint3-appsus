import { NoteList } from '../cmps/NoteList.jsx'
import { NoteForm } from '../cmps/NoteForm.jsx'
import { addNote, deleteNote, updateNote } from '../services/note.service.js'

export function NoteIndex() {
    const { useState } = React
    const [notes, setNotes] = useState([])

    const handleAddNote = (text) => {
        setNotes((prevNotes) => addNote(prevNotes, text))
    }

    const handleDeleteNote = (id) => {
        setNotes((prevNotes) => deleteNote(prevNotes, id))
    }

    const handleUpdateNote = (id, newText) => {
        setNotes((prevNotes) => updateNote(prevNotes, id, newText))
    }

    return (
        <div className="hero">
            <div className="NoteIndex">
                <h1>MissKeepApp</h1>
                <NoteForm onAdd={handleAddNote} />
                <NoteList notes={notes} onDelete={handleDeleteNote} onUpdate={handleUpdateNote} />
            </div>
        </div>
    )
}
