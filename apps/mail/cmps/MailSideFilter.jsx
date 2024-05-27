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
            <button className={filterByToEdit.status === 'inbox' ? 'clicked' : ''} onClick={() => handleChange('inbox')}>Inbox</button>
            <button className={filterByToEdit.status === 'starred' ? 'clicked' : ''} onClick={() => handleChange('starred')}>Starred</button>
            <button className={filterByToEdit.status === 'sent' ? 'clicked' : ''} onClick={() => handleChange('sent')}>Sent</button>
            <button className={filterByToEdit.status === 'trash' ? 'clicked' : ''} onClick={() => handleChange('trash')}>Trash</button>
            <button className={filterByToEdit.status === 'draft' ? 'clicked' : ''} onClick={() => handleChange('draft')}>Draft</button>
        </nav>
    </section>
}