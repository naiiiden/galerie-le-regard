import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <div className="landing-page-container">
            <h1>Le Regard</h1>
            <p>A collection of the world&apos;s most renowned <Link to="/paintings">paintings</Link></p>
            <p>(for peeps with pockets as deep as their love for art)</p>
        </div>
    )
}

export default Landing