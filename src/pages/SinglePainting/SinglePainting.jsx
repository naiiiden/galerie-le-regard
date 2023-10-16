import { Link, useParams } from 'react-router-dom';
import { UseCart } from '../../context/CartContext';
import clearAlert from '../../helpers/clearAlert';

const SingleProduct = () => {
  const { productName } = useParams();
  const { cartState, dispatch } = UseCart(); 

  const product = cartState.products.find((product) => product.name === productName);

  const currentItem = cartState.products.findIndex((item) => item.name === product.name)

  let previousItem = currentItem - 1;
  let nextItem = currentItem + 1;

  previousItem < 0 
    ? previousItem = cartState.products.length - 1 
    : previousItem = currentItem -1;
  nextItem >= cartState.products.length 
    ? nextItem = 0 
    : nextItem = currentItem + 1;

  const previousProduct = previousItem >= 0 ? cartState.products[previousItem] : null;
  const nextProduct = nextItem < cartState.products.length ? cartState.products[nextItem] : null;

  document.title = `${product.name} | Le Regard`;

  return (
    <>
      {!product 
          ? <div>Product not found</div> 
          : 
          <div className="single-painting-container">
              <img src={`/${product.images[0]}`} alt={product.name}/>
              <div className="painting-information">
                <span aria-hidden="true">{product.id}</span>
                <h1>Title: {product.name}</h1>
                <p>Artist: {product.artist}</p>
                <p>Year: {product.year}</p>
                <p>Dimensions: {product.dimensions}</p>
                <p>Medium: {product.medium}</p>
                <p>Location: {product.location}</p>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                {product.price === null ? null : <p>Price: ${product.price}</p>}
                <button
                  onClick={() => 
                    dispatch({ type: 'ADD_TO_CART', payload: product }, 
                    clearAlert(dispatch)
                  )}
                  disabled={product.quantity === 0 || product.quantity === null || product.price === null ? true : false}
                >Add to cart</button>
              </div>
            <div className="painting-controls-container">
              <Link to={`/paintings/${previousProduct?.category}/${previousProduct?.name}`}>previous painting</Link>
              <Link to={`/paintings/${nextProduct?.category}/${nextProduct?.name}`}>next painting</Link>
            </div>
          </div>}
    </>
  );
};

export default SingleProduct;
