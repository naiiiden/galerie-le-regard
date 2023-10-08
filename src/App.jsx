import { UseCart } from "./context/CartContext";
import { OpenCart } from "./context/OpenCartContext";
import { Routes, Route } from "react-router-dom";
import SinglePainting from "./pages/SinglePainting/SinglePainting";
import AllPaintings from "./pages/AllPaintings/AllPaintings";
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
          <Route path="/paintings" element={<AllPaintings/>}/>
          <Route path="/paintings/:category" element={<AllPaintings/>}/>
          <Route path="/paintings/:category/:productName" element={<SinglePainting onQuantityChange={(itemToUpdate, newQuantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { itemToUpdate, newQuantity } })}/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App;
