const CartDropdown = ({ className, onClick }) => {
  return (
    <div className={`${className} cart-menu-closed`}>
        <button onClick={onClick}>close</button>
        CartDropdown
    </div>
  )
}

export default CartDropdown