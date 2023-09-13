import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import clearAlert from '../../helpers/clearAlert';

const SingleProduct = () => {
  const { productName } = useParams();
  const { cartState, dispatch } = useCart(); 

  const product = cartState.products.find((product) => product.name === productName);

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
                  <label htmlFor={`quantity-product-${product.id}`}>Quantity: </label>
                  <input
                    id={`quantity-product-${product.id}`}
                    type='number'
                    // TODO ADD VALUE
                    // value={1}
                    min={1}
                    max={product.quantity}
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
