

export function MailPreview({ mail, onRemove, onToggleUnread }) {

    return <article className="mail-preview">
        <div>
            <span className="mail-address">

                <span className="draft">{mail.isDraft && '--Draft--'}</span>
                {mail.from}
            </span>
            <span className="mail-subject">{mail.subject}</span>
        </div>
        <span className="mail-date">{new Date(mail.sentAt).toDateString()}</span>
        <span className="mail-btns">
            <button onClick={ev => {
                ev.preventDefault()
                ev.stopPropagation()
                onRemove(mail)
            }}>🗑️</button>
            {mail.isRead && <button onClick={(ev) => onToggleUnread(ev, mail, false)} title="mark unread">✉️</button>}
            {!mail.isRead && <button onClick={(ev) => onToggleUnread(ev, mail, true)} title="mark read">📧</button>}
            <button title="send as note">📤</button>

        </span>
    </article>
}