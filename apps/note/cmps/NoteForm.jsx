const { useState } = React

const TEXT_TYPE = 'text'
const LINK_TYPE = 'link'
const IMAGE_TYPE = 'image'
const VIDEO_TYPE = 'video'

export function NoteForm({ onAdd }) {
    const [content, setContent] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')
    const [type, setType] = useState(TEXT_TYPE)
    const [file, setFile] = useState(null)

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onAdd({ text: content, backgroundColor, type, file })
        setContent('')
        setType(TEXT_TYPE)
        setFile(null)
    }

    const handleFileChange = (ev) => {
        const selectedFile = ev.target.files[0]
        setFile(selectedFile)
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(ev) => setContent(ev.target.value)}
                placeholder="Type your note here..."
            ></textarea>

            <input
                type="color"
                value={backgroundColor}
                onChange={(ev) => setBackgroundColor(ev.target.value)}
            />

            <select value={type} onChange={(ev) => setType(ev.target.value)}>
                <option value={TEXT_TYPE}>Text</option>
                <option value={LINK_TYPE}>Link</option>
                <option value={IMAGE_TYPE}>Image</option>
                <option value={VIDEO_TYPE}>Video</option>
            </select>

            {type === IMAGE_TYPE && (
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            )}

            <button type="submit">Add Note</button>
        </form>
    )
}