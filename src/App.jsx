import { UseCart } from "./context/CartContext";
import { OpenCart } from "./context/OpenCartContext";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import Products from "./pages/Products/Products";
import Header from "./components/Header/Header";
import './styles/general.css';
import Landing from "./pages/Landing/Landing";

const App = () => {
  const { dispatch } = UseCart();

  const { openedCart } = OpenCart();

  return (
    <div className="App">
      <Header/>
      <main inert={openedCart ? '' : undefined}>
        <Routes>
          <Route path="*" element={<h1>not found (page WIP)</h1>}/>
          <Route path="/" element={<Landing/>}/>
          <Route path="/paintings" element={<Products/>}/>
          <Route path="/:productName" element={<SingleProduct onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
