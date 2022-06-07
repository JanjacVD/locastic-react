function CartCounter(props) {
  let msg;
  if(props.cnt === 1){
    msg = ' item in cart'
  }
  else{
    msg = ' items in cart'
  }
  return (
    <div className={props.cnt > 0 ? "cart-counter cart-counter-blue" : 'cart-counter'}>
      <span className="cart-counter-mobile">{props.cnt > 0 ? props.cnt : ''}</span>
      <span className="cart-counter-desktop">{props.cnt > 0 ?  props.cnt + msg : 'Cart is empty'}</span>
    </div>

  );
}
export default CartCounter;
