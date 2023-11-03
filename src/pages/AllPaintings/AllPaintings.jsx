import { useState, useEffect } from 'react';
import { UseCart } from '../../context/CartContext'
import clearAlert from '../../helpers/clearAlert';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useParams, useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
const AllPaintings = () => {
  const { cartState, dispatch } = UseCart();
  const { category } = useParams();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(category || '');

  const categories = [...new Set(cartState.products.map((product) => product.category))];

  const filteredProducts = selectedCategory
    ? cartState.products.filter((product) => product.category === selectedCategory)
    : cartState.products;

  useEffect(() => {
    setSelectedCategory(category || '');
    category === undefined 
      ? document.title = 'All Paintings | Le Regard'   
      : document.title = `All ${category} Paintings | Le Regard` 
  }, [category]);

  return (
    <div className="all-paintings-container">
      <div role="radiogroup" aria-label="Filter paintings by style">
        <p>Style:</p>
        <label id="all">
          All
          <input 
            checked={selectedCategory === ''}
            type="radio" 
            htmlFor="all" 
            name="Painting category" 
            value={''}
            onChange={(e) => e.target.value === '' ? navigate('/paintings') : navigate(`/paintings/${e.target.value}`)}
          />
        </label>
        {categories.map(category => 
          <label key={category} id={category}>{category}
            <input 
              checked={selectedCategory === category}
              type="radio" 
              htmlFor={category} 
              name="Painting category"
              value={category}
              onChange={(e) => e.target.value === '' ? navigate('/paintings') : navigate(`/paintings/${e.target.value}`)}
            />
          </label>  
        )}
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <ProductItem 
            linkHref={`/paintings/${product.category}/${product.name}`}
            product={product} 
            key={product.id}
            onClick={() => 
                dispatch({ type: 'ADD_TO_CART', payload: product }, 
                clearAlert(dispatch)
            )}
            style={{
              // transform: `translate(${Math.random() * 100}%, ${Math.random() * 100}%)`,
              // top: `${Math.random() * 200}%`, // Adjust the range as needed
              // left: `${Math.random() * 90}%`, // Adjust the range as needed
            }}
          />
        ))}
      </ul>
    </div>
  )
}

export default AllPaintings