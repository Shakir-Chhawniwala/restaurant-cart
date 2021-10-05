import { useContext } from 'react'
import CartContext from '../../Store/cart-context'
import Modal from '../UI/Modal'
import classes from "./Cart.module.css"
import CartItem from './CartItem'

const Cart = (props) => {

  const context = useContext(CartContext)

  const cartItemAddHandler = (item) => {
  context.addItem({ ...item, amount: 1 });
};

const cartItemRemoveHandler = (id) => {
  context.removeItem(id)
};

    const cartItems = (
      <ul className={classes["cart-items"]}>
        {context.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}
          />
        ))}
      </ul>
    );

    const totalAmount = `$${context.totalAmount.toFixed(2)}`
    const hasItems = context.items.length > 0

    
    return (
      <Modal onClose={props.onClose}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button}>Order</button> }
        </div>
      </Modal>
    );
}

export default Cart
