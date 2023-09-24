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
                <img src={product.images[0]} alt='' style={{ width: '300px' }}/>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Category: {product.category}</p>
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
