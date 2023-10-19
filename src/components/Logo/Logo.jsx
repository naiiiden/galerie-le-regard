import { NavLink } from "react-router-dom"

const Logo = ({ className }) => {
  return (
    <NavLink to="/" className={`logo ${className}`}>
        <span aria-hidden="true">LR</span>  
        <span>Galerie <br/>Le Regard</span>
    </NavLink>
  )
}

export default Logo