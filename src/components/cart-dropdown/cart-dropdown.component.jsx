import './cart-dropdown.styles.scss'
import Button from "../button/button.component";
import CartItem from "../card-item/cart-item.component";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context";

const CartDropdown = () => {
  const {cartItems} = useContext(CartContext)

  return(
    <div className={'cart-dropdown-container'}>
      <div className={'cart-items'}>
        <div className={'cart-items'}>
          {cartItems.map(item => <CartItem key={item.id} cartItem={item}></CartItem>)}
        </div>
        <Button>GO TO CHECKOUT</Button>
      </div>
    </div>
  )
}

export default CartDropdown;