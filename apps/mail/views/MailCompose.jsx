import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function MailCompose({ onCloseCompose }) {
    const [mail, setMail] = useState(mailService.getEmptyMail())

    useEffect(() => {
        setMail(mailService.getEmptyMail())
    }, [])

    function handleChange({ target }) {
        const { name } = target
        const value = target.value

        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()

        mail.sentAt = Date.now()
        console.log(mail.from.email)
        mailService.save(mail)
            .then(() => {
                showSuccessMsg('Email sent successfully')
                onCloseCompose(false)
            })
    }

    return <section className="mail-compose">
        <header>
            <h2>New Message</h2>
            <button onClick={() => onCloseCompose(false)}>X</button>
        </header>
        <form onSubmit={handleSubmit}>
            <span>From:   {mail.from.email}</span>
            <input onChange={handleChange} type="email" name="to" placeholder="To" />
            <input onChange={handleChange} type="text" name="subject" placeholder="Subject" />
            <input onChange={handleChange} type="text" name="body" />
            <button>Send</button>
        </form>
    </section>
}