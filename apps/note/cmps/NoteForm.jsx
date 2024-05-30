// NoteForm.jsx
const { useState, useEffect } = React

export function NoteForm({ onAdd }) {
    const [content, setContent] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [files, setFiles] = useState(null)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onAdd({ text: content, backgroundColor, files })
        setContent('')
        setBackgroundColor('#ffffff')
        setFiles(null)
    }

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files
        setFiles(selectedFiles)
    }
    
    useEffect(() => {
        if (files && files.length > 0) {
            onAdd({ text: content, backgroundColor, files })
            setContent('')
            setBackgroundColor('#ffffff')
            setFiles(null)
        }
    }, [files, content, backgroundColor])
    

    return (
        <div className="search-menu">
            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Write your note here..."
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                    />
                </div>
                <input
                    type="color"
                    value={backgroundColor}
                    onChange={(ev) => setBackgroundColor(ev.target.value)}
                />
                <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    multiple
                />
                <button type="submit">Add Note</button>
            </form>
        </div>
    )
}