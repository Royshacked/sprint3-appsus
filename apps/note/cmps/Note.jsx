// Note.jsx
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

    const renderContent = () => {

        return <p>{note.text}</p>
    }
     

    const renderFiles = () => {
        console.log('1')
        if (!note.files || !Array.isArray(note.files) || note.files.length === 0) {
            console.log('2')
            return undefined
        }
        console.log('3')
        return note.files.map((file, index) => (
            <div key={index}>
                {file.type.startsWith('image/') ? (
                    <img src={URL.createObjectURL(file)} alt={`Image ${index}`} />
                ) : file.type.startsWith('video/') ? (
                    <video controls>
                        <source src={URL.createObjectURL(file)} type={file.type} />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <a href={URL.createObjectURL(file)} download={file.name}>
                        {file.name}
                    </a>
                )}
            </div>
        ))
    }
    
    

    return (
        <div className="note" style={{ backgroundColor }}>
            {isEditing ? (
                <div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {renderContent()}
                    {note.files && note.files.length > 0 && <div>{renderFiles()}</div>}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}