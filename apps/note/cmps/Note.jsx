const { useState } = React

export function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(note.text)
    const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor || '#ffffff')

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        onUpdate(note.id, text, backgroundColor)
        setIsEditing(false)
    }

    return (
        <div className="note" style={{ backgroundColor: backgroundColor }}>
            {isEditing ? (
                <div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
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