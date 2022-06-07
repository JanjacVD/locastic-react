import axios from "axios";
import { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { usersApi, workshopsApi } from "../constants/constants";
import { useNavigate } from "react-router-dom";
import backArrow from "../images/back-arrow.svg";
import brush from "../images/brush.svg";
import calendar from "../images/calendar.svg";
import clock from "../images/clock.svg";
import ShoppingCartContext from "../context/ShoppingCartContext";
import "../css/workshops.css";
import Workshop from "../components/Workshop";
function WorkshopData() {
  const {items, addToCart} = useContext(ShoppingCartContext);

  const params = useParams();
  const [workshop, setWorkshop] = useState();
  const [user, setUser] = useState();
  const [similar, setSimilar] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [value, setValue] = useState(1);
  const [filtered, setFiltered] = useState();
  const history = useNavigate();
  const[cartDisplayed, setCartDisplayed] = useState(true)
  const[y,setY] = useState(document.scrollingElement.scrollHeight);

  const handleNavigation = useCallback((e) => {
    if(y > window.scrollY){
      setCartDisplayed(true)
    }
    else{
      setCartDisplayed(false)
    }
    setY(window.scrollY)
  },[y]);
 
  useEffect(() => {
    window.addEventListener("scroll", handleNavigation);
    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  async function fetchData() {
    const setSpinner = setDataLoaded(false);
    const response = await axios
      .get(workshopsApi + params.workshopID)
      .catch((err) => console.log(err));
    const newWorkshop = setWorkshop(response.data);
    const userResponse = await axios
      .get(usersApi + response.data.id)
      .catch((err) => console.log(err));
    const newUser = setUser(userResponse.data);
    const similarResponse = await axios
      .get(workshopsApi)
      .catch((err) => console.log(err));
    const setData = setSimilar(similarResponse.data);
    const removeSpinner = setDataLoaded(true);
  }
  function scroll() {
    window.scrollTo(0, 0);
  }
  useEffect(() => {
    fetchData();
    scroll();
  }, [params]);
  useEffect(() => {
    if (similar !== null && similar !== undefined) {
      let filtering = similar
        .filter((s) => s.category === workshop.category)
        .filter((s) => s.id !== workshop.id);
      setFiltered(filtering);
    }
  }, [similar]);

  if (dataLoaded === false) {
    return <Loading />;
  } else {
    return (
      <>
      <div className="workshop-container">
        {workshop !== null &&
        workshop !== undefined &&
        user != null &&
        user != undefined ? (
          <>
            <div className="side">
              <div className="side-arrow" onClick={() => history(-1)}>
                <img src={backArrow} />
                <h6>Natrag</h6>
              </div>
            </div>
            <div className="workshop-data">
              <img
                className="workshop-img"
                src={workshop.imageUrl}
                alt={"image"}
              />
              <div className="workshop-data-container">
                <div className="workshop-data-text">
                  <div className="workshop-data-text-time">
                    <div>
                      <img className="workshop-brush" src={brush} alt="Brush" />
                    </div>
                    <div>
                      <img src={calendar} alt="calendar icon" />
                      <h6>{new Date(workshop.date).toLocaleDateString()}</h6>
                    </div>
                    <div>
                      <img src={clock} alt="clock icon" />
                      <h6>{new Date(workshop.date).toLocaleTimeString()}</h6>
                    </div>
                  </div>
                  <div className="workshop-data-text-title">
                    <h1>{workshop.title}</h1>
                  </div>
                  <div className="workshop-data-text-author">
                    <p className="with">WITH</p>
                    <h4>{user.name}</h4>
                  </div>
                  <div className="workshop-data-text-description">
                    {workshop.desc}
                  </div>
                </div>
                <div className={cartDisplayed ? "workshop-add-to-cart add-to-cart-mobile-displayed" : "workshop-add-to-cart add-to-cart-mobile-not-displayed"}>
                  <h5 className="buy-title">Buy your ticket</h5>
                  <div className="workshop-add-to-cart-price">
                    <h2>{workshop.price},00</h2>
                    <h5>EUR</h5>
                  </div>
                  <div className="workshop-add-to-cart-qty">
                    <input type={'number'}
                      className="qty-select"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                    />
                    <button className="workshop-add-to-cart-btn" onClick={() => {addToCart(workshop, value)}}>
                      Add to cart
                    </button>
                  </div>
                  <div className="workshop-add-to-cart-subtotal">
                    Subtotal: {workshop.price * value},00 EUR
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          "No data"
        )}
      </div>
        {filtered !== null && filtered !== undefined && filtered.length > 0 ? (
          <div className="similar-workshops-container">
            <div></div>
            <div className="similar-workshops-container-real">
            <h2>Similar Workshops</h2>
            <div className="simillar-workshops-container-real-workshops">
            {filtered.slice(0,3).map((s) => (
              <Workshop
                key={s.id}
                id={s.id}
                image={s.imageUrl}
                date={s.date}
                title={s.title}
                price={s.price}
              />
            ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        </>
    );
  }
}
export default WorkshopData;
