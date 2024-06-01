const { Link, useSearchParams, Outlet } = ReactRouterDOM

export function MailSideFilter({ filterBy, onFilter, unreadMailsCount, isMenuOpen, onSetIsMenuOpen }) {
    const { status } = filterBy
    const sideFilterBy = { status }

    function handleChange(value) {
        onFilter({ ...sideFilterBy, status: value })
        onSetIsMenuOpen(false)
    }

    return <section className="mail-side-filter">
        {isMenuOpen && <div className="logo">
            <h2>
                Gmail
            </h2>
            <img src="../../../assets/icons/Gmail-Logo.png"></img>
            <button className="close-btn" onClick={() => onSetIsMenuOpen(false)}>X</button>
        </div>}
        <nav>
            <Link to="/mail/compose"><button className="compose-btn">Compose</button></Link>

            <button className={sideFilterBy.status === 'inbox' ? 'clicked' : ''} onClick={() => handleChange('inbox')}>Inbox <small>({unreadMailsCount})</small></button>
            <button className={sideFilterBy.status === 'starred' ? 'clicked' : ''} onClick={() => handleChange('starred')}>Starred</button>
            <button className={sideFilterBy.status === 'sent' ? 'clicked' : ''} onClick={() => handleChange('sent')}>Sent</button>
            <button className={sideFilterBy.status === 'trash' ? 'clicked' : ''} onClick={() => handleChange('trash')}>Trash</button>
            <button className={sideFilterBy.status === 'draft' ? 'clicked' : ''} onClick={() => handleChange('draft')}>Draft</button>
        </nav>
    </section>
}