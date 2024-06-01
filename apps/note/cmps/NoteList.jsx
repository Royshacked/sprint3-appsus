// NoteList.jsx
import { Note } from './Note.jsx'

export function NoteList({ notes, onDelete, onUpdate, onDuplicate }) {
    return (
        <div className="note-list">
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onDuplicate={onDuplicate} />
            ))}
        </div>
    )
}
