import { NavLink } from "react-router-dom"

const Logo = () => {
  return (
    <NavLink to="/" className="logo">
        <div aria-hidden="true"><span>LR</span></div>  
        <span>Galerie <br/>Le Regard</span>
    </NavLink>
  )
}

export default Logo