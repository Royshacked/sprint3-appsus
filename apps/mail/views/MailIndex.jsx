import { MailTopFilter } from "../cmps/MailTopFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { eventBusService, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"
import { MailCompose } from "./MailCompose.jsx"


const { useState, useEffect } = React
const { Link, useSearchParams, Outlet } = ReactRouterDOM
const { useNavigate } = ReactRouter



export function MailIndex() {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isLoading, setIsLoading] = useState(true)
    const [unreadMailsCount, setUnreadMailsCount] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        setSearchParams(filterBy)
        mailService.query(filterBy)
            .then(mails => setMails(mails))
            .finally(() => setIsLoading(false))
    }, [filterBy])

    useEffect(() => {
        mailService.query()
            .then(mails => mails.reduce((acc, mail) => {
                if (!mail.isRead) acc++
                return acc
            }, 0))
            .then(count => setUnreadMailsCount(count))
    }, [mails])

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...newFilterBy }))
    }

    function onRemove(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg('email removed successfully')
            })
            .catch(() => showErrorMsg('couldnt remove email'))
            .finally(navigate('/mail'))
    }

    function onToggleStar(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred

        mailService.save(mail)
            .then(() => setFilterBy(prevMails => ({ ...prevMails })))
    }

    return <section className="mail-index">
        <div className="mail-index-header full">
            <div className="logo">
                <h2>
                    Gmail
                </h2>
                <img src="../../../assets/icons/Gmail-Logo.png"></img>
            </div>
            <MailTopFilter filterBy={filterBy} onFilter={onSetFilterBy} />
        </div>

        <div className="mail-index-side">
            <Link to="/mail/compose"><button className="compose-btn">Compose</button></Link>
            <MailSideFilter filterBy={filterBy} onFilter={onSetFilterBy} unreadMailsCount={unreadMailsCount} />
        </div>

        {isLoading && <div className="loading"></div>}
        {!isLoading && mails.length === 0 && <h2 className="no-emails">no emails found</h2>}
        {!isLoading && mails.length > 0 && <MailList mails={mails} onRemove={onRemove} onToggleStar={onToggleStar} />}

        <Outlet context={[filterBy]} />
    </section>
}

