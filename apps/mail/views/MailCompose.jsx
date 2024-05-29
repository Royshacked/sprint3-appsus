import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams, useOutletContext } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy] = useOutletContext()

    const navigate = useNavigate()

    useEffect(() => {
        setMail(mailService.getEmptyMail())
        setSearchParams(filterBy)
    }, [])

    function handleChange({ target }) {
        const { name } = target
        const value = target.value
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        mail.sentAt = Date.now()
        mail.isDraft = false
        mailService.save(mail)
            .then(() => showSuccessMsg('Email sent successfully'))
            .catch(() => showErrorMsg('Couldn\'nt send email'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }

    return <section className="mail-compose">
        <header>
            <h2>New Message</h2>
            <button onClick={() => navigate({ pathname: '/mail', search: searchParams.toString(), })}>X</button>
        </header>
        <form onSubmit={handleSubmit}>
            <span>From:   {mail.from}</span>
            <input onChange={handleChange} type="email" name="to" placeholder="To" value={mail.to} required />
            <input onChange={handleChange} type="text" name="subject" placeholder="Subject" value={mail.subject} required />
            <input onChange={handleChange} type="text" name="body" value={mail.body} required />
            <button>Send</button>
        </form>
    </section>
}