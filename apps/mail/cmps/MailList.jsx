import { MailPreview } from "./MailPreview.jsx";

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemove, onToggleStar, onToggleUnread }) {

    return <section className="mail-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id} className={mail.isRead ? 'read' : ''}>
                    <button className={`starred-btn ${mail.isStarred ? 'starred' : ''}`} onClick={(ev) => onToggleStar(ev, mail)}>
                        {!mail.isStarred && <span>&#9734;</span>}
                        {mail.isStarred && <span>&#9733;</span>}
                    </button>
                    {<Link to={mail.isDraft ? `/mail/compose/${mail.id}` : `/mail/${mail.id}`}><MailPreview mail={mail} onRemove={onRemove} onToggleUnread={onToggleUnread} /></Link>}
                </li>
            )}
        </ul>
    </section>
}
