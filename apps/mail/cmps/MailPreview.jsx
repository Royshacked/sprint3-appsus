

export function MailPreview({ mail }) {

    return <article className="mail-preview">
        <span className="mail-address">{mail.from}</span>
        <span className="mail-subject">{mail.subject}</span>
        <span className="mail-date">{new Date(mail.sentAt).toDateString()}</span>
    </article>
}