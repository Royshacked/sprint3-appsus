const { Link, useSearchParams, Outlet } = ReactRouterDOM
const { useNavigate } = ReactRouter


export function MailCompose({ onCloseCompose }) {
    const navigate = useNavigate()
    return <section className="mail-compose">
        compose
        <button onClick={() => onCloseCompose(false)}></button>
    </section>
}