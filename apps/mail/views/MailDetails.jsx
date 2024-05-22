import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouter
const { Link } = ReactRouterDOM


export function MailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [])

    function loadMail() {
        setIsLoading(true)

        mailService.get(mailId)
            .then(mail => setMail(mail))
            .catch(err => {
                navigate('/mail')
                alert(err)
            })
            .finally(() => setIsLoading(false))

    }
    console.log(mail)
    if (isLoading) return <h2>Loading...</h2>
    return <section className="mail-details">
        <header>
            <Link to="/mail" ><button>back</button></Link>
            <button>remove</button>
            <button>mark as unread</button>
            <button>save as note</button>
            <button>category</button>
            <button>category</button>
            <button>prev</button>
            <button>next</button>
        </header>
        <h2>{mail.subject}</h2>
        <p>{mail.from}</p>
        <p>
            <span>{mail.to.fullname}</span>
            <span>{mail.to.email}</span>
        </p>

        <p>{new Date(mail.sentAt).toDateString()}</p>

        <p>{mail.body}</p>

        <footer>
            <button>facebook</button>
        </footer>

    </section>
}