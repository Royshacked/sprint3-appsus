import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams, useOutletContext } = ReactRouterDOM
const { useNavigate, useParams } = ReactRouter


export function MailCompose() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [mailToEdit, setMailToEdit] = useState(mailService.getComposeFromSearchParams(searchParams))
    const [filterBy, setFilterBy] = useOutletContext()

    const navigate = useNavigate()
    const { mailId } = useParams()

    useEffect(() => {
        setSearchParams({ ...filterBy, ...mailToEdit })
        if (!mailId) return
        mailService.get(mailId)
            .then(mail => setMailToEdit(mail))
    }, [])

    function handleChange({ target }) {
        const { name } = target
        const value = target.value
        setMailToEdit(prevMailToEdit => ({ ...prevMailToEdit, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        mailService.send(mailToEdit)
            .then((mail) => {
                showSuccessMsg('Email sent successfully')
                setMailToEdit(mail)
                setFilterBy({ ...filterBy, ...mailToEdit })
            })
            .catch(() => showErrorMsg('Couldn\'nt send email'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }

    function onSaveDraft() {
        if (!mailToEdit.body && !mailToEdit.to && !mailToEdit.subject) return navigate({ pathname: '/mail', search: searchParams.toString(), })

        mailService.saveDraft(mailToEdit)
            .then((mail) => {
                showSuccessMsg('Draft saved successfully')
                setMailToEdit(mail)
                setFilterBy({ ...filterBy, ...mailToEdit })
            })
            .catch(() => showErrorMsg('Couldn\'nt save draft'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }

    return <section className="mail-compose">
        <header>
            <h2>New Message</h2>
            <button onClick={onSaveDraft}>X</button>
        </header>
        <form onSubmit={handleSubmit}>
            <span>From:   {mailToEdit.from}</span>
            <input onChange={handleChange} type="email" name="to" placeholder="To" value={mailToEdit.to} required />
            <input onChange={handleChange} type="text" name="subject" placeholder="Subject" value={mailToEdit.subject} required />
            <input onChange={handleChange} type="text" name="body" value={mailToEdit.body} required />
            <button>Send</button>
        </form>
    </section>
}