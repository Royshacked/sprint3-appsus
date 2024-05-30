import { MailTopFilter } from "../cmps/MailTopFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'
import { MailSideFilter } from "../cmps/MailSideFilter.jsx"


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

    function onRemove(mailToRemove) {
        if (mailToRemove.removedAt) remove(mailToRemove)
        else if (!mailToRemove.removedAt) moveToTrash(mailToRemove)
    }

    function remove(mailToRemove) {
        mailService.remove(mailToRemove.id)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => mail.id !== mailToRemove.id))
                showSuccessMsg('Email removed successfully')
            })
            .catch(() => showErrorMsg('Couldnt remove email'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }

    function moveToTrash(mailToRemove) {
        mailService.moveToTrash(mailToRemove)
            .then(() => {
                setMails(prevMails => prevMails.filter(mail => !mail.removedAt))
                showSuccessMsg('Email moved to trash')
            })
            .catch(() => showErrorMsg('couldnt move email to trash'))
            .finally(() => navigate({ pathname: '/mail', search: searchParams.toString(), }))
    }

    function onToggleStar(ev, mail) {
        ev.stopPropagation()
        mail.isStarred = !mail.isStarred

        mailService.save(mail)
            .then(() => setFilterBy(prevMails => ({ ...prevMails })))
    }

    const str = 'roy'

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
            {/* <button onClick={() => navigate('/mail/compose' + '?' + 'subject=helllo&status=draft')} className="compose-btn">Compose</button> */}
            <MailSideFilter filterBy={filterBy} onFilter={onSetFilterBy} unreadMailsCount={unreadMailsCount} />
        </div>

        {isLoading && <div className="loading"></div>}
        {!isLoading && mails.length === 0 && <h2 className="no-emails">no emails found</h2>}
        {!isLoading && mails.length > 0 && <MailList mails={mails} onRemove={onRemove} onToggleStar={onToggleStar} />}

        <Outlet context={[filterBy, onSetFilterBy]} />
    </section>
}



