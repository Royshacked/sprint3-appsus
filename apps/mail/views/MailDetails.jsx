import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        setIsLoading(true)
        onMarkUnread()
            .finally(() => setIsLoading(false))
    }

    function onMarkUnread(isRead = true) {
        return mailService.get(mailId)
            .then(mail => {
                mail.isRead = isRead
                return mailService.save(mail)
            })
            .then(mail => setMail(mail))
            .catch(err => {
                navigate('/mail')
                alert(err)
            })
    }

    function onRemove(mailToRemove) {
        if (mailToRemove.removedAt) remove(mailToRemove)
        else if (!mailToRemove.removedAt) moveToTrash(mailToRemove)
    }

    function remove(mailToRemove) {
        mailService.remove(mailToRemove.id)
            .then(() => showSuccessMsg('Email removed successfully'))
            .catch(() => showErrorMsg('Couldnt remove email'))
            .finally(() => navigate('/mail'))
    }

    function moveToTrash(mailToRemove) {
        mailService.moveToTrash(mailToRemove)
            .then(() => showSuccessMsg('Email moved to trash'))
            .catch(() => showErrorMsg('couldnt move email to trash'))
            .finally(() => navigate('/mail'))
    }

    if (isLoading) return <div className="loading"></div>
    return <section className="mail-details">
        <header>
            <Link to="/mail" title="inbox"><button>📩</button></Link>

            <button onClick={() => onRemove(mail)} title="remove">🗑️</button>
            {mail.isRead && <button onClick={() => onMarkUnread(false)} title="mark unread">✉️</button>}
            {!mail.isRead && <button onClick={() => onMarkUnread(true)} title="mark read">📧</button>}
            <button title="send as note">📤</button>

            <Link to={`/mail/${mail.prevMailId}`} title="older"><button>&larr;</button></Link>
            <Link to={`/mail/${mail.nextMailId}`} title="newer"><button>&rarr;</button></Link>
        </header>
        <main>
            <h2>{mail.subject}</h2>
            <p>From:
                <span>{mail.from}</span>
            </p>
            <p>To:
                <span>{mail.to}</span>
            </p>

            <p>{new Date(mail.sentAt).toDateString()}</p>

            <p>{mail.body}</p>
        </main>
        {/* <footer>
            <button>facebook</button>
        </footer> */}

    </section>
}