

export function MailPreview({ mail, onRemove }) {

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
        </span>
    </article>
}