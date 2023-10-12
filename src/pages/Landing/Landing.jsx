import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="landing-page-container">
            <p>Welcome to</p>
            <h1>Le Regard</h1>
            <p>
                A collection of the world&apos;s most renowned <Link to="/paintings">paintings</Link>
            </p>
        </div>
    )
}

export default Landing