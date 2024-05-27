import { Note } from './Note.jsx'

export function NoteList({ notes, onDelete, onUpdate }) {
    return (
        <div className="note-list">
            {notes.map((note) => (
                <Note key={note.id} note={note} onDelete={onDelete} onUpdate={onUpdate} text={note.text} backgroundColor={note.backgroundColor}/>
            ))}
        </div>
    )
}
