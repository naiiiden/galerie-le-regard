import { Link, useParams } from 'react-router-dom';
import { UseCart } from '../../context/CartContext';
import clearAlert from '../../helpers/clearAlert';
import { useState } from 'react';

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

  const [arrowPosition, setArrowPosition] = useState({ top: 0, left: 0 });
  const [hideDecArrows, setHideDecArrows] = useState(true);

  const updateArrowPosition = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;

    setArrowPosition({ top: `${cursorY}px`, left: `${cursorX}px` });
  };

  return (
    <>
      {!product 
          ? <div>Product not found</div> 
          : 
          <div className="single-painting-container">
              <img src={`/${product.images[0]}`} alt={product.name}/>
              <div className="painting-information">
                <span aria-hidden="true">{product.id}</span>
                <h1><span>Title:</span> {product.name}</h1>
                <p><span>Artist:</span> {product.artist}</p>
                <p><span>Year:</span> {product.year}</p>
                <p><span>Dimensions:</span> {product.dimensions}</p>
                <p><span>Medium:</span> {product.medium}</p>
                <p><span>Location:</span> {product.location}</p>
                <p><span>Category:</span> {product.category}</p>
                <p><span>Description:</span> {product.description}</p>
                {product.price === null ? null : <p><span>Price:</span> ${product.price}</p>}
                <button
                  onClick={() => 
                    dispatch({ type: 'ADD_TO_CART', payload: product }, 
                    clearAlert(dispatch)
                  )}
                  disabled={product.quantity === 0 || product.quantity === null || product.price === null ? true : false}
                >Add to cart</button>
              </div>
            <div className="painting-controls-container" onMouseMove={updateArrowPosition} onMouseEnter={() => setHideDecArrows(false)} onMouseLeave={() => setHideDecArrows(true)}>
              {/* <div className="cursor-arrow arrow" style={arrowPosition}></div> */}
              <Link className="previous-painting" to={`/paintings/${previousProduct?.category}/${previousProduct?.name}`}>
                <img src={`/${previousProduct.images[0]}`} alt=""/>
                <div className="previous-painting-arrow arrow" style={{ display: !hideDecArrows ? "none" : "unset" }}></div>
                {previousProduct.name}
              </Link>
              <Link className="next-painting" to={`/paintings/${nextProduct?.category}/${nextProduct?.name}`}>
                {nextProduct.name}
                <div className="next-painting-arrow arrow" style={{ display: !hideDecArrows ? "none" : "unset" }}></div>
                <img src={`/${nextProduct.images[0]}`} alt=""/>
              </Link>
            </div>
          </div>}
    </>
  );
};

export default SingleProduct;
