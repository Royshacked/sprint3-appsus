import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails }) {

    return <section className="mail-list">
        <ul>
            {mails.map(mail =>
                <li key={mail.id}>
                    <button className="starred-btn">&#9734;</button>
                    <MailPreview />
                </li>
            )}
        </ul>
    </section>
}
