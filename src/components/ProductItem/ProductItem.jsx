/* eslint-disable react/prop-types */
const ProductItem = ({ product, onClick }) => {
  return (
    <li key={product.id} style={{
        background: 'darkcyan',
        width: 'fit-content',
        padding: '1rem',
        margin: '1rem',
      }}>
        <p style={{
          margin: '0 0 .5rem 0',
        }}>{product.name} - ${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <button onClick={onClick} disabled={product.quantity === 0} aria-label={`Add ${product.name} to cart`}>Add to cart</button>
      </li>
  )
}

export default ProductItem