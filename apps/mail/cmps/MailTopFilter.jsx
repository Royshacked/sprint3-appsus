const { useState, useEffect } = React


export function MailTopFilter({ filterBy, onFilter }) {
    const { txt, isRead } = filterBy
    const topFilterBy = { txt, isRead }
    const [filterByToEdit, setFilterByToEdit] = useState(topFilterBy)

    useEffect(() => {
        onFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { type, name } = target
        const value = (type === 'number') ? +target.value : target.value

        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [name]: value }))
    }

    return <section className="mail-filter">
        <input onChange={handleChange} type="search" name="txt" value={filterByToEdit.txt} placeholder="Search" />
        <select onChange={handleChange} name="isRead" value={filterByToEdit.isRead}>
            <option >All</option>
            <option value={'true'}>Read</option>
            <option value={'false'}>Unread</option>
        </select>
    </section>
}