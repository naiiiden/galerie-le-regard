import { useState } from 'react';
import { UseCart } from '../../context/CartContext'
import clearAlert from '../../helpers/clearAlert';
import ProductItem from '../../components/ProductItem/ProductItem';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Products = ({ style }) => {
    const { cartState, dispatch } = UseCart();
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();
    const categories = [...new Set(cartState.products.map(product => product.category))];
    const filteredProducts = selectedCategory === '' 
        ? cartState.products 
        : cartState.products.filter(product => product.category === selectedCategory)

    return (
        <div>
            <select onChange={(e) => (setSelectedCategory(e.target.value), navigate(selectedCategory ? `/${selectedCategory}` : '/'))} value={selectedCategory} aria-label='Filter products by category'>
                <option value={''}>Filter by category</option>
                {categories.map(category => 
                    <option key={category} value={category}>{category}</option>
                )}
            </select>
            <ul style={style}>
            {filteredProducts.map((product) => (
                <ProductItem 
                    linkHref={`products/${product.name}`}
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

export default Products