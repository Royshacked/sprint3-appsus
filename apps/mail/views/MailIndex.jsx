import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React

export function MailIndex() {
    const [mails, setMails] = useState([])

    useEffect(() => {
        mailService.query()
            .then(mails => setMails(mails))
    }, [])

    return <section className="mail-index">
        <div className="mail-index-header full">
            <h2>
                Gmail
            </h2>
            <img src="../../../assets/icons/Gmail-Logo.png"></img>
        </div>
        <MailList mails={mails} />
    </section>
}

