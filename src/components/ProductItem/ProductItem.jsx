/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const ProductItem = ({ product, linkHref }) => {
  return (
    <li key={product.id}>
        <Link to={linkHref} data-title={product.name}>
          <img src={`/${product.image}`} alt='' style={{ width: "unset" }}/>
          <p><span>{product.name}</span></p>
        </Link>
      </li>
  )
}

export default ProductItem