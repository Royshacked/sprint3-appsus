const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onFilter }) {
    const { status } = filterBy
    const sideFilterBy = { status }
    const [filterByToEdit, setFilterByToEdit] = useState(sideFilterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(value) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, status: value }))
    }

    return <section className="mail-side-filter">
        <nav>
            <button onClick={() => handleChange('inbox')}>Inbox</button>
            <button onClick={() => handleChange('starred')}>Starred</button>
            <button onClick={() => handleChange('sent')}>Sent</button>
            <button onClick={() => handleChange('trash')}>Trash</button>
            <button onClick={() => handleChange('draft')}>Draft</button>
        </nav>
    </section>
}