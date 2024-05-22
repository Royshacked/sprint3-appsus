const { useState } = React

export function NoteForm({ onAdd }) {
    const [text, setText] = useState('')

    const handleSubmit = (ev) => {
        ev.preventDefault()
        onAdd(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your note here..."
            ></textarea>
            <button type="submit">Add Note</button>
        </form>
    )
}
