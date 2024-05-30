// Note.jsx
const { useState, useEffect } = React

export function Note({ note, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(note.text)
    const [backgroundColor, setBackgroundColor] = useState(note.backgroundColor || "#ffffff")
    const [files, setFiles] = useState(note.files || [])

    useEffect(() => {
        const objectURLs = files.map((file) => {
            if (!file.url) {
                file.url = URL.createObjectURL(file)
            }
            return file.url
        })

        return () => {
            objectURLs.forEach(URL.revokeObjectURL)
        }
    }, [files])

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        onUpdate(note.id, text, backgroundColor, files)
        setIsEditing(false)
    }

    const renderContent = () => {
        return <p>{note.text}</p>
    }

    const renderFiles = () => {
        return Array.isArray(files) && files.length > 0 && files.map((file, index) => (
            <div key={index}>
                {file && Object.keys(file).length > 0 && file.type && (file.type.startsWith('image/') || file.type.startsWith('video/')) ? (
                    file.type.startsWith('image/') ? (
                        <img src={file.url || URL.createObjectURL(file)} alt={`Image ${index}`} />
                    ) : (
                        <video controls>
                            <source src={file.url || URL.createObjectURL(file)} type={file.type} />
                            Your browser does not support the video tag.
                        </video>
                    )
                ) : (
                    file && Object.keys(file).length > 0 && (
                        <a href={file.url || URL.createObjectURL(file)} download={file.name}>
                            {file.name}
                        </a>
                    )
                )}
            </div>
        ))
    }
    

    return (
        <div className="note" style={{ backgroundColor }}>
            {isEditing ? (
                <div>
                    <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea>
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    {renderContent()}
                    {renderFiles()}
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={() => onDelete(note.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}
