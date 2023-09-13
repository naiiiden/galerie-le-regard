import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import clearAlert from '../../helpers/clearAlert';
import { useState } from 'react';

const SingleProduct = ({ onQuantityChange }) => {
  const { productName } = useParams();
  const { cartState, dispatch } = useCart(); 

  const product = cartState.products.find((product) => product.name === productName);

  const [quantity, setQuantity] = useState(product.quantity);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= product.availableQuantity) {
      setQuantity(newQuantity);
      onQuantityChange(product, newQuantity);
    }
  };

  return (
    <div>
        {!product 
            ? <div>Product not found</div> 
            : 
            <div>
                <div>
                  <h2>{product.name}</h2>
                  <p>Price: ${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Category: {product.category}</p>
                  <input
                    id={`quantity-product-${product.id}`}
                    type='number'
                    value={quantity}
                    onChange={handleQuantityChange}
                    min='1'
                    max={product.availableQuantity}
                  />
                  <br/>
                  <button
                    onClick={() => 
                      dispatch({ type: 'ADD_TO_CART', payload: product }, 
                      clearAlert(dispatch)
                    )}
                  >Add to cart</button>
                </div>
            </div>}
    </div>
  );
};

export default SingleProduct;
