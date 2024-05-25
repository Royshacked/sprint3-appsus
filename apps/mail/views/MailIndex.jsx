import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM


export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .finally(() => setIsLoading(false))
    }, [filterBy])

    function onSetFilterBy(newFilterBy) {
        setFilterBy({ ...newFilterBy })
    }

    function onRemove(mailId) {
        mailService.remove(mailId)
            .then(setMails(prevMails => prevMails.filter(mail => mail.id !== mailId)))
    }

    return <section className="mail-index">
        <div className="mail-index-header full">
            <div className="logo">
                <h2>
                    Gmail
                </h2>
                <img src="../../../assets/icons/Gmail-Logo.png"></img>
            </div>
            <MailFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </div>
        {isLoading && <div className="loading"></div>}
        {!isLoading && mails.length === 0 && <h2 className="no-emails">no emails found</h2>}
        {!isLoading && mails.length > 0 && <MailList mails={mails} onRemove={onRemove} />}
    </section>
}

