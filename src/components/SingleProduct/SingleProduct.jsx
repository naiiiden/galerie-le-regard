import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const SingleProduct = () => {
  const { productName } = useParams();
  const { cartState } = useCart(); 

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
                </div>
            </div>}
    </div>
  );
};

export default SingleProduct;
