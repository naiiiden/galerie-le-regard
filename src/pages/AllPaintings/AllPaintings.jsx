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
      <select
        onChange={(e) => e.target.value === '' ? navigate('/paintings') : navigate(`/paintings/${e.target.value}`)}
        value={selectedCategory || ''}
        aria-label='Filter products by category'
      >
        <option value={''}>Filter by category</option>
        {categories.map(category => 
            <option key={category} value={category}>{category}</option>
        )}
      </select>
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
          />
        ))}
      </ul>
    </div>
  )
}

export default AllPaintings