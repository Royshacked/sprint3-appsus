const { useState } = React


export function NoteForm({ onAdd }) {
    const [text, setText] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('#ffffff')

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onAdd({ text, backgroundColor })
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(ev) => setText(ev.target.value)}
                placeholder="Type your note here..."
            ></textarea>
            
            <input
                className="colorPicker"
                type="color"
                value={backgroundColor}
                onChange={(ev) => setBackgroundColor(ev.target.value)}
            />
            
            <button type="submit">Add Note</button>
        </form>
    )
}