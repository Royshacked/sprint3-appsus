import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
    }, [filterBy])

    function onSetFilterBy(newFilterBy) {
        setFilterBy({ ...newFilterBy })
    }

    return <section className="mail-index">
        <div className="mail-index-header full">
            <h2>
                Gmail
            </h2>
            <img src="../../../assets/icons/Gmail-Logo.png"></img>
            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </div>
        <MailList mails={mails} />
    </section>
}

