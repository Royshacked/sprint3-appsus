const { useState } = React

const TEXT_NOTE = 'text'
const LINK_NOTE = 'link'
const IMAGE_NOTE = 'image'
const VIDEO_NOTE = 'video'

// todo: add types
export function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(note.text)
    const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor || '#ffffff')
    const [type, setType] = useState(note.type || TEXT_NOTE)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        onUpdate(note.id, text, backgroundColor, type)
        setIsEditing(false)
    }

    const renderContent = () => {
        switch (type) {
            case TEXT_NOTE:
                return <p>{note.text}</p>
            case LINK_NOTE:
                return <a href={note.text}>{note.text}</a>
            case IMAGE_NOTE:
                return <img src={note.content} alt="Image" />
            case VIDEO_NOTE:
                return <video src={note.content} controls />
            default:
                return undefined
        }
    }
     

    // this component should render dynamic components per note.type, render relevant component
    return (
        <div className="note" style={{ backgroundColor }}>
            {isEditing ? (
                <div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value={TEXT_NOTE}>Text</option>
                        <option value={LINK_NOTE}>Link</option>
                        <option value={IMAGE_NOTE}>Image</option>
                        <option value={VIDEO_NOTE}>Video</option>
                    </select>
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {renderContent()}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}
