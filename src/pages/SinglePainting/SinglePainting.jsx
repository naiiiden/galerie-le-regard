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
  const [showDirection, setDirection] = useState({ transform: "rotate(45deg)" });
  const [showCursor, setShowCursor] = useState({ display: "none" });

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
              <img className="painting-image" src={`/${product.image}`} aria-labelledby="painting-title"/>
              <div className="painting-information">
                <div className="painting-information-inner-wrapper">
                  <h1 id="painting-title">{product.name}</h1>
                  <div className="overflow-wrapper">
                    {product.artist && <p className="painting-artist"><span>Artist:</span> {product.artist}</p>}
                    {product.year && <p className="painting-year"><span>Year:</span> {product.year}</p>}
                    {product.dimensions && <p className="painting-dimensions"><span>Dimensions:</span> {product.dimensions}</p>}
                    {product.medium && <p className="painting-medium"><span>Medium:</span> {product.medium}</p>}
                    {product.location && <p className="painting-location"><span>Location:</span> {product.location}</p>}
                    {product.category && <p className="painting-category"><span>Category:</span> {product.category}</p>}
                    {product.description && <p className="painting-description"><span>Description:</span> <span>{product.description}</span></p>}
                  </div>
                  <div className="painting-button-price-wrapper">
                    {product.price === null ? null : <p className="painting-price"><span>Price:</span> ${product.price.toLocaleString()}</p>}
                    <button
                      className="black-btn"
                      onClick={() => 
                        dispatch({ type: 'ADD_TO_CART', payload: product }, 
                        clearAlert(dispatch)
                      )}
                      disabled={product.quantity === 0 || product.quantity === null || product.price === null ? true : false}
                    >Add to cart</button>
                  </div>
                </div>
              </div>
            <div className="painting-controls-container" onMouseMove={updateArrowPosition} onMouseEnter={() => setShowCursor({ display: "unset" })} onMouseLeave={() => setShowCursor({ display: "none" })}>
              <Link className="previous-painting" to={`/paintings/${previousProduct?.category}/${previousProduct?.name}`} onMouseEnter={() => setDirection({ ...showDirection, transform: "rotate(-45deg)"})}>
                <img src={`/${previousProduct.image}`} alt=""/>
                <span className="text-overflow-fix">{previousProduct.name}</span>
              </Link>
              <Link className="next-painting" to={`/paintings/${nextProduct?.category}/${nextProduct?.name}`} onMouseEnter={() => setDirection({ ...showDirection, transform: "rotate(135deg)"})}>
                <span className="text-overflow-fix">{nextProduct.name}</span>
                <img src={`/${nextProduct.image}`} alt=""/>
              </Link>
              <div className="cursor-arrow arrow" style={{ ...arrowPosition, ...showDirection, ...showCursor }}></div>
            </div>
          </div>}
    </>
  );
};

export default SingleProduct;
