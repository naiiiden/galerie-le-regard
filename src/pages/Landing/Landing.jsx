import { Link } from "react-router-dom"

const Landing = () => {
    return (
        <>
            <h1>Galerie de l'Art Exquis</h1>
            <Link to="/paintings"><b>paintings</b></Link>
        </>
    )
}

export default Landing