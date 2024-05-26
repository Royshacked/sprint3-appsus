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

        mailService.get(mailId)
            .then(mail => {
                mail.isRead = true
                return mailService.save(mail)
            })
            .then(mail => setMail(mail))
            .catch(err => {
                navigate('/mail')
                alert(err)
            })
            .finally(() => setIsLoading(false))
    }

    function onRemove(mailId) {
        mailService.remove(mailId)
            .then(() => {
                showSuccessMsg('email removed successfully')
                navigate('/mail')
            })
            .catch(() => {
                showErrorMsg('couldnt remove email')
                navigate('/mail')
            })
        // .finally(navigate('/mail'))
    }

    if (isLoading) return <div className="loading"></div>
    return <section className="mail-details">
        <header>
            <Link to="/mail" ><button>back</button></Link>
            <button onClick={() => onRemove(mailId)}>remove</button>
            <button>mark as unread</button>
            <button>save as note</button>
            <button>category</button>
            <button>category</button>
            <Link to={`/mail/${mail.prevMailId}`}><button>older</button></Link>
            <Link to={`/mail/${mail.nextMailId}`}><button>newer</button></Link>
        </header>
        <h2>{mail.subject}</h2>
        <p>{mail.from}</p>
        <p>
            <span>{mail.to.fullname}</span>
            <span>{mail.to.email}</span>
        </p>

        <p>{new Date(mail.sentAt).toDateString()}</p>

        <p>{mail.body}</p>

        <footer>
            <button>facebook</button>
        </footer>

    </section>
}