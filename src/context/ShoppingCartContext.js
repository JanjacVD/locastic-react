import { createContext, useState } from "react";
const ShoppingCartContext = createContext();

export function ShoppingCartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [inCart, setInCart] = useState();
  const [totalSum, setTotalSum] = useState();

  function getSum() {
    let sum = items.reduce(function (prev, item) {
      return prev + +item.qty;
    }, 0);
    let totalSum = items.reduce(function (prev, item) {
      let multipled = item.item.price * item.qty;
      return prev + +multipled;
    }, 0);
    setTotalSum(totalSum);
    setInCart(sum);
  }
  const addToCart = (item, qty) => {
    if (items.some((i) => i.item.id === item.id)) {
      let objIndex = items.findIndex((obj) => obj.item.id === item.id);
      let first = items[objIndex].qty;
      let second = qty;
      let sum = +first + +second;
      items[objIndex].qty = sum;
      getSum();
    } else {
      setItems((prevState) => [...prevState, { item, qty }]);
      getSum();
    }
  };

  const removeFromCart = (item) => {
    let i = items.filter((it) => it.item.id != item);
    setItems(i);
    getSum();
  };

  const updateQty = (item, qty) => {
    let objIndex = items.findIndex((obj) => obj.item.id === item);
    items[objIndex].qty = qty;
    getSum();
  };

  function rmAll(){
    setItems(null);
  }
  return (
    <ShoppingCartContext.Provider
      value={{ items, inCart,totalSum, addToCart, removeFromCart, updateQty, rmAll }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
export default ShoppingCartContext;
