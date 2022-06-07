import logo from "../images/logo.svg";
import cart from "../images/cart.svg";
import { Link } from "react-router-dom";
import CartCounter from "../components/CartCounter";
import "../css/navbar.css";
import ShoppingCartContext from "../context/ShoppingCartContext";
import {createElement, useContext, useState} from "react";
import x from '../images/x.svg';
import CartItem from "../components/CartItem";
import '../css/form.css';
import Thanks from "./Thanks";
function Navbar() {
  const hasNumber = /\d/;   
  const EmailRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const NumRegEx = /^[0-9]+$/;

  const [cartToggled, setCartToggled] = useState(false);
  const {items, inCart, totalSum, rmAll} = useContext(ShoppingCartContext);
  const [checkout, setCheckout] = useState(false);
  const [fName, setFName] = useState(null);
  const [lName, setLName] = useState(null);
  const [email, setEmail] = useState(null);
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [zip, setZip] = useState(null);
  const [agree, setAgree] = useState(false);
  const [thanks, setThanks] = useState(false);

  const [fNameError, setFNameError] = useState(undefined);
  const [lNameError, setLNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [dobError, setDobError] = useState(undefined);
  const [addressError, setAddressError] = useState(undefined);
  const [zipError, setZipError] = useState(undefined);
  const [agreeError, setAgreeError] = useState(undefined);


  function submitForm(e){
    e.preventDefault();
    checkFName();
    checkLName();
    checkDob();
    checkAdress();
    checkEmail();
    checkZip();
    checkAgree();
    if(fNameError === null && lNameError === null && dobError === null && addressError === null && zipError === null && emailError === null && zipError === null && agreeError === null){
      let details = {
        first:fName,
        last:lName,
        email:email,
        dob:dob,
        gender:gender,
        address:address,
        zip:zip,
        agreed:agree
      }
      console.log({
        person:details,
        order:items
      });
      setCheckout(false)
      setFName(null)
      setLName(null)
      setEmail(null)
      setDob(null)
      setGender(null)
      setAddress(null)
      setZip(null)
      setAgree(null)
      rmAll()
      setThanks(true);
    }
  }

  function checkAgree(){
    if(agree){
      setAgreeError(null);
    }
    else{
      setAgreeError('Please provide that you agree with terms')
    }
  }
  function checkFName(){
    if(fName != null){
      if(hasNumber.test(fName)){
        setFNameError('Your first name contains invalid symbols')
      }
      else{
        setFNameError(null);
      }
    }
    else{
      setFNameError('First name should not be empty')
    }
  }

  function checkLName(){
    if(lName != null){
      if(hasNumber.test(lName)){
        setLNameError('Your last name contains invalid symbols')
      }
      else{
        setLNameError(null);
      }
    }
    else{
      setLNameError('Last name should not be empty')
    }
  }

  function checkEmail(){
    if(email != null){
      if(!email.match(EmailRegEx)){
        setEmailError('Invalid email address')
      }
      else{
        setEmailError(null);
      }
    }
    else{
      setEmailError('Email should not be empty')
    }
  }

  function checkDob(){
  const isValidDate = (dob) => new Date(dob).toString() !== 'Invalid Date'
  if(dob != null){
    if(!isValidDate(dob)){
      setDobError('Date of birth is required')    
    }
    else{
      setDobError(null);
    }
  }
  else{
    setDobError('Date of birth is required')
  }
  }

  function checkAdress(){
    if(address != null){
      setAddressError(null);
    }
    else{
      setAddressError('Address should not be empty')
    }
  }

  function checkZip(){
    if(zip != null){
      if(!zip.match(NumRegEx)){
        setZipError('Your zip code should contain only numbers')
      }
      else{
        setZipError(null);
      }
    }
    else{
      setZipError('Zip code should not be empty')
    }
  }

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <img src={logo} alt="Logo icon" />
        </Link>
        <div className="navbar-cart" onClick={() => setCartToggled(!cartToggled)}>
          <img src={cart} alt="Cart icon" />
          <CartCounter cnt={inCart}/>
        </div>
      </nav>
      <div className={cartToggled ? "cart cart-toggled" : "cart cart-closed"}>
            <div className='cart-top'>
            <div className='cart-title-cont'><img src={cart} alt="Toggle cart"/><h5 className='cart-title'>{inCart > 0 ? inCart + ' Workshops' : 'No workshops'}</h5></div>
            <button className='cart-close-btn' onClick={() => setCartToggled(!cartToggled)}><img src={x} alt="Close Cart"/></button>
            </div>
            <div className='cart-workshop-list'>
                {items != null ? items.map((workshop) => 
                <CartItem 
                key = {workshop.item.id}
                id = {workshop.item.id}
                img = {workshop.item.image}
                title = {workshop.item.title}
                price = {workshop.item.price}
                qty = {workshop.qty}
                />
                ) : ''}
            </div>
                  {inCart > 0 ? 
            <div className='cart-subtotal'>
            <h6>Subtotal</h6>
            <div className='cart-subtotal-sum'>
            <h2>{totalSum},00</h2>
            <h4>EUR</h4>
            </div>
            <button className="checkout-button" onClick={() => {setCheckout(!checkout);setCartToggled(!cartToggled)}}>Checkout</button>
            </div>
            : ''}
        </div>
      <div className="clear"></div>
      {checkout ?  <div className="checkout-form">
            <button className='close-form-btn' onClick={() => {setCheckout(!checkout)}}><img src={x} alt='close checkout'/></button>
            <form>
                <h2>Checkout</h2>
                <h6 style={{color:'#7F7F7F',fontWeight:'600',width:'50%',paddingBottom:'1.4rem'}}>What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing.</h6>
                <div className='form-box'>
                <div className='form-line'>
                    <label htmlFor="fname">First Name <h6 className="warning">{fNameError}</h6></label>
                    <input type={'text'} id="fname" className={fNameError == null ? 'form-valid' : 'form-invalid'} placeholder='Type your first name here' value={fName} onChange={(e) => {setFName(e.target.value);checkFName()}}/>
                </div>
                <div className='form-line'>
                    <label htmlFor="lname">Last Name <h6 className="warning">{lNameError}</h6></label>
                    <input type={'text'} id="lname" placeholder='Type you last name here' className={lNameError == null ? 'form-valid' : 'form-invalid'} value={lName} onChange={(e) => {setLName(e.target.value);checkLName()}}/>
                </div>
                <div className='form-line'>
                    <label htmlFor="email">Email address <h6 className="warning">{emailError}</h6></label>
                    <input type={'email'} id="email" placeholder='Type your email address here' className={emailError == null ? 'form-valid' : 'form-invalid'} value={email} onChange={(e) => {setEmail(e.target.value);checkEmail()}}/>
                </div>
                <div className='form-line form-double-line'>
                    <div className='form-double-unit'>
                    <label htmlFor="dob">Date of birth <h6 className="warning">{dobError}</h6></label>
                    <input type={'date'} id="dob" value={dob} className={dobError == null ? 'form-valid' : 'form-invalid'} onChange={(e) => {setDob(e.target.value);checkDob()}}/>
                    </div>
                    <div className='form-double-unit'>
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value={'Other'}>Other</option>
                        <option value={'Male'}>Male</option>
                        <option value={'Female'}>Female</option>
                    </select>
                    </div>
                </div>
                <div className='form-line'>
                    <label htmlFor="add">Address <h6 className="warning">{addressError}</h6></label>
                    <input type={'text'} id="add" className={addressError == null ? 'form-valid' : 'form-invalid'} value={address} onChange={(e) => {setAddress(e.target.value);checkAdress()}} />
                </div>
                <div className='form-line'>
                    <label htmlFor="zip">Zip code <h6 className="warning">{zipError}</h6></label>
                    <input type={'text'}  id="zip" className={zipError  == null ? 'form-valid' : 'form-invalid'} value={zip} onChange={(e) => {setZip(e.target.value);checkZip()}} />
                </div>
                <div className='form-line form-checkbox-cont'>
                    <label className="label-container" htmlFor="agree">I agree
                    <input type={'checkbox'} checked={agree} onChange={() => setAgree(!agree)} id="agree" />
                    <span class="checkmark"></span>
                    <h6 className="warning">{agreeError}</h6>
                    </label>
                </div>
                <div className='form-line form-button-cont'>
                    <button className='form-button' onClick={(e) => {submitForm(e)}}>Checkout</button>
                </div>
               

                </div>
            </form>
        </div> : ''}
        {thanks ? <Thanks /> : ''}
    </div>
  );
}

export default Navbar;
