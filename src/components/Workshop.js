import calendar from "../images/calendar.svg";
import clock from "../images/clock.svg";
import "../css/workshop.css";
import cart from "../images/cart.svg";
import brush from "../images/brush.svg";
import { Link } from "react-router-dom";
import ShoppingCartContext from "../context/ShoppingCartContext";
import {useContext} from "react";


function Workshop(props) {
  const {addToCart} = useContext(ShoppingCartContext);
  return (
    <div className="workshop-item">
      <div className="img-container">
        <img className="workshop-img" loading="lazy" src={props.image} alt={props.title} />
      </div>
      <img className="brush" src={brush} alt="Brush" />

      <div className="workshop-info">
        <div className="workshop-time-date">
          <div>
            <img src={calendar} alt="calendar icon" />
            <h6>{new Date(props.date).toLocaleDateString()}</h6>
          </div>
          <div>
            <img src={clock} alt="clock icon" />
            <h6>{new Date(props.date).toLocaleTimeString()}</h6>
          </div>
        </div>
        <h4><Link to={`/workshops/${props.id}`}>{props.title}</Link></h4>
        <div className="workshop-price">
          <h3>{props.price},00</h3>
          <h6>EUR</h6>
        </div>
        <button className="workshop-button" onClick={() => addToCart(props, 1)}>
          <span className="workshop-btn-desktop">Add to cart</span>
          <span className="workshop-btn-mobile">
            <img src={cart} alt="Add to cart" />
          </span>
        </button>
      </div>
    </div>
  );
}
export default Workshop;
