import ShoppingCartContext from "../context/ShoppingCartContext";
import trash from "../images/trash.svg";
import { useContext, useState, useEffect } from "react";
function CartItem(props) {
  const { removeFromCart, updateQty } = useContext(ShoppingCartContext);

  const [value, setValue] = useState(props.qty);
  return (
    <div className="cart-item">
      <img className="cart-item-img" src={props.img} alt={props.title} />
      <div className="cart-item-data">
        <h4 className="cart-item-data-title">{props.title}</h4>
        <img
          className="cart-item-data-delete"
          onClick={() => removeFromCart(props.id)}
          src={trash}
        />
        <div className="cart-item-data-qty-price">
          <input
            type={"number"}
            min={0}
            onChange={(e) => {
              setValue(e.target.value);
              updateQty(props.id, e.target.value);
            }}
            value={value}
          />
            <div className="cart-item-price">
                <h3>{props.price},00</h3>
                <h6>EUR</h6>
            </div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
