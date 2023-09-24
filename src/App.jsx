import { useCart } from "./context/CartContext";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Products from "./pages/Products/Products";
import Header from "./components/Header/Header";
import './styles/general.css';

const App = () => {
  const ulStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  }

  const { dispatch } = useCart();

  return (
    <div className="App">
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Products style={ulStyle}/>}/>
          <Route path="/:productName" element={<SingleProduct onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
