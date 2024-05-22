const { useState } = React

export function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(note.text)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        onUpdate(note.id, text)
        setIsEditing(false)
    }

    return (
        <div className="note">
            {isEditing ? (
            <div>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <button onClick={handleSave}>Save</button>
            </div>
            ) : (

            <div>
                <p>{note.text}</p>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        )}
        </div>
    )
}
