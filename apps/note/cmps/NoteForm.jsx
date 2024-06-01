// NoteForm.jsx
const { useState, useEffect } = React

export function NoteForm({ onAdd }) {
    const [content, setContent] = useState("")
    const [backgroundColor, setBackgroundColor] = useState("#ffffff")
    const [files, setFiles] = useState([])

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onAdd({ text: content, backgroundColor, files })
        setContent("")
        setBackgroundColor("#ffffff")
        setFiles([])
    }

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files
        const fileList = Array.from(selectedFiles).map((file) => ({
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file),
        }))
        setFiles(fileList)
    }

    useEffect(() => {
        if (files && files.length > 0) {
            onAdd({ text: content, backgroundColor, files })
            setContent("")
            setBackgroundColor("#ffffff")
            setFiles([])
        }
    }, [files, content, backgroundColor])

    return (
        <div className="note-form">
            <form onSubmit={handleSubmit}>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Write your note here..."
                        value={content}
                        onChange={(ev) => setContent(ev.target.value)}
                    />
                </div>
                <input className="color-picker" type="color" value={backgroundColor} onChange={(ev) => setBackgroundColor(ev.target.value)} />
                <label htmlFor="file-upload" className="file-label">
                    Select File
                    <input
                        id="file-upload"
                        className="file-upload-input"
                        type="file"
                        accept="image/*, video/*, audio/*" 
                        onChange={handleFileChange}
                        multiple
                    />
                </label>
                <button type="submit" className="add-btn">Add Note</button>
            </form>
        </div>
    )
}