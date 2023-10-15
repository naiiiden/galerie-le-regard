import { NavLink } from "react-router-dom"

const Logo = () => {
  return (
    <NavLink to="/">
        <span aria-hidden="true">LR</span>  
        <span>Galerie <br/>Le Regard</span>
    </NavLink>
  )
}

export default Logo