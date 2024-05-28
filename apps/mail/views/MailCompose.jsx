import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailCompose({ closeCompose }) {
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
        mailService.save(mail)
            .then(() => showSuccessMsg('Email sent successfully'))
            .catch(() => showErrorMsg('Couldn\'nt send email'))
            .finally(closeCompose(false))
    }

    function onCloseCompose() {
        if (!mail.to) return closeCompose(false)

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
            <span>From:   {mail.from}</span>
            <input onChange={handleChange} type="email" name="to" placeholder="To" value={mail.to} />
            <input onChange={handleChange} type="text" name="subject" placeholder="Subject" value={mail.subject} />
            <input onChange={handleChange} type="text" name="body" value={mail.body} />
            <button>Send</button>
        </form>
    </section>
}