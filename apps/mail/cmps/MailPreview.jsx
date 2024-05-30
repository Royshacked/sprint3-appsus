

export function MailPreview({ mail, onRemove }) {

    return <article className="mail-preview">
        <span className="mail-address">
            {mail.from}
            <span className="draft">{mail.isDraft && '--Draft--'}</span>
        </span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-date">{new Date(mail.sentAt).toDateString()}</span>
        <span className="mail-btns">
            <button onClick={ev => {
                ev.preventDefault()
                ev.stopPropagation()
                onRemove(mail)
            }}>🗑️</button>
        </span>
    </article>
}