const { useState, useEffect } = React

export function MailSideFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })


    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange(value) {
        setFilterByToEdit(({ ...filterBy, status: value }))
    }

    return <section className="mail-side-filter">
        <nav>
            <button onClick={() => handleChange('inbox')}>Inbox</button>
            <button onClick={() => handleChange('sent')}>Sent</button>
            <button onClick={() => handleChange('trash')}>Trash</button>
            <button onClick={() => handleChange('draft')}>Draft</button>
        </nav>
    </section>
}