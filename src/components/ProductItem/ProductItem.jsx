/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const ProductItem = ({ product, linkHref, style }) => {
  return (
    <li key={product.id} style={style}>
      <Link to={linkHref} data-title={product.name}>
        <img src={`/${product.image}`} alt='' loading="lazy"/>
        <p>{product.name}</p>
      </Link>
    </li>
  )
}

export default ProductItem