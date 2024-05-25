import { MailPreview } from "./MailPreview.jsx";

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemove }) {

    return <section className="mail-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id} className={mail.isRead ? 'read' : ''}>
                    <button className="starred-btn">&#9734;</button>
                    <Link to={`/mail/${mail.id}`} ><MailPreview mail={mail} onRemove={onRemove} /></Link>
                </li>
            )}
        </ul>
    </section>
}
