import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams, useOutletContext } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter


export function MailCompose() {
    const [mail, setMail] = useState(mailService.getEmptyMail())
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy] = useOutletContext()

    const navigate = useNavigate()
    const { mailId } = useParams()
    console.log(mailId)
    useEffect(() => {
        setSearchParams(filterBy)
        if (!mailId) return
        mailService.get(mailId)
            .then(mail => setMail(mail))
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

    function onSaveDraft() {
        if (!mail.body && !mail.to && !mail.subject) return navigate({ pathname: '/mail', search: searchParams.toString(), })

        mail.isDraft = true
        mailService.save(mail)
            .then((mail) => {
                showSuccessMsg('Draft saved successfully')
                setMail(mail)
            })
            .catch(() => showErrorMsg('Couldn\'nt save draft'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }


    return <section className="mail-compose">
        <header>
            <h2>New Message</h2>
            <button onClick={() => onSaveDraft()}>X</button>
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