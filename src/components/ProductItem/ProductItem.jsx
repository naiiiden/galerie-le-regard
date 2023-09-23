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
          <img src={product.images[0]} alt='' style={{ width: "300px" }}/>
          <p style={{
            margin: '0 0 .5rem 0',
          }}>{product.name} - ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Category: {product.category}</p>
        </Link>
        {/* <button onClick={onClick} disabled={product.quantity === 0} aria-label={`Add ${product.name} to cart`}>Add to cart</button> */}
      </li>
  )
}

export default ProductItem