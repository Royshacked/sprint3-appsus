import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function MailCompose({ closeCompose }) {
    const [mail, setMail] = useState(mailService.getEmptyMail())

    useEffect(() => {
        setMail(mailService.getEmptyMail())
    }, [])

    function handleChange({ target }) {
        const { name } = target
        const value = target.value

        if (name === 'email') setMail(prevMail => ({ ...prevMail, to: { ...prevMail.to, email: value } }))
        else setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        mail.sentAt = Date.now()
        mailService.save(mail)
            .then(() => showSuccessMsg('Email sent successfully'))
            .catch(() => showErrorMsg('Couldn\'nt send email'))
            .finally(closeCompose(false))
    }

    function onCloseCompose() {
        if (!mail.to.email) return closeCompose(false)

        mail.sentAt = Date.now()
        mail.isDraft = true
        mailService.save(mail)
            .then(() => showSuccessMsg('Draft saved'))
            .catch(() => showErrorMsg('Couldn\'nt save draft'))
            .finally(closeCompose(false))
    }

    // function saveDraft() {
    //     mailService.save(mail)
    //         .then(mail => {
    //             showSuccessMsg('Draft saved')
    //             setMail(mail)
    //         })
    //         .catch(() => showErrorMsg('Couldn\'nt save draft'))
    // }

    return <section className="mail-compose">
        <header>
            <h2>New Message</h2>
            <button onClick={() => onCloseCompose(false)}>X</button>
        </header>
        <form onSubmit={handleSubmit}>
            <span>From:   {mail.from.email}</span>
            <input onChange={handleChange} type="email" name="email" placeholder="To" value={mail.to.email} />
            <input onChange={handleChange} type="text" name="subject" placeholder="Subject" value={mail.subject} />
            <input onChange={handleChange} type="text" name="body" value={mail.body} />
            <button>Send</button>
        </form>
    </section>
}