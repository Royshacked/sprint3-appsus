
export function MailSideFilter({ filterBy, onFilter, unreadMailsCount }) {
    const { status } = filterBy
    const sideFilterBy = { status }

    function handleChange(value) {
        onFilter({ ...sideFilterBy, status: value })
    }

    return <section className="mail-side-filter">
        <nav>
            <button className={sideFilterBy.status === 'inbox' ? 'clicked' : ''} onClick={() => handleChange('inbox')}>Inbox <small>({unreadMailsCount})</small></button>
            <button className={sideFilterBy.status === 'starred' ? 'clicked' : ''} onClick={() => handleChange('starred')}>Starred</button>
            <button className={sideFilterBy.status === 'sent' ? 'clicked' : ''} onClick={() => handleChange('sent')}>Sent</button>
            <button className={sideFilterBy.status === 'trash' ? 'clicked' : ''} onClick={() => handleChange('trash')}>Trash</button>
            <button className={sideFilterBy.status === 'draft' ? 'clicked' : ''} onClick={() => handleChange('draft')}>Draft</button>
        </nav>
    </section>
}