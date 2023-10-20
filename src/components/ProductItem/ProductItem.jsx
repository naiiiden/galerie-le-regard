/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const ProductItem = ({ product, linkHref }) => {
  return (
    <li key={product.id} style={{
        background: 'blanchedalmond',
        width: 'fit-content',
        padding: '1rem',
        margin: '1rem',
      }}>
        <Link to={linkHref} style={{ color: 'black' }}>
          <img src={product.image} alt='' style={{ width: "300px" }}/>
          <p style={{margin: '0 0 .5rem 0'}}>
            <span>{product.name}</span>
            <span>{product.price === null ? null : ` - ${product.price}`}</span>
            </p>
          {product.quantity === null ? null : <p>Quantity: {product.quantity}</p>}
          <p>Category: {product.category}</p>
        </Link>
      </li>
  )
}

export default ProductItem