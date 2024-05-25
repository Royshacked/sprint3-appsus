const { useState, useEffect } = React


export function MailFilter({ filterBy, onFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

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