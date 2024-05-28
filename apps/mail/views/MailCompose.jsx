const { Link, useSearchParams, Outlet } = ReactRouterDOM


export function MailCompose() {
    return <section className="mail-compose">
        <Link to="/mail"><button>X</button></Link>
        compose
    </section>
}