import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../Context/MyContext';
import './Cart.scss';

const Cart = () => {
  const { cart, setCart,removeProductFromCart,handleIncreaseQuantity,handleDecreaseQuantity,TotalValue,token } = useContext(MyContext);
  const[loading,setLoading] = useState(true)

  // for cartitems fetching start
useEffect(() => {

  if(!token){
    return 
  }
  const fetchCartItems = async () => {
    try {
      const response = await fetch('https://expressd.vercel.app/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    
      const data = await response.json();
      setCart(data.cartInfo);
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
    } catch (error) {
      alert('please try again')
    } finally {
      setLoading(false);
    }
  };

  fetchCartItems();
}, [setCart,token]);
// for cartitems fetching end
  


if(loading){
  <p>loading...</p>
}








  return (
    <div className="cart-container">

    {cart && <h1>cart Details</h1>}

 
      {cart && cart.length > 0 ? (
        <>
          {cart
            .sort((a,b)=>b._id.localeCompare(a._id))
            .map((item) => (
            <div className="cart-item" key={item.productid}>
              <img src={item.productimg} alt={item.productname} className="cart-item-img" />
              <div className="cart-item-details">
                <h3>{item.productname}</h3>
                <p>Price: ${item.productprice}</p>
                <p>Size: {item.size}</p>
                <div className="cart-item-controls">
                  <button onClick={() => handleDecreaseQuantity(item.categoryid,item.productid,item.size)}>-</button>
                  <p>{item.quantity}</p>
                  <button onClick={() => handleIncreaseQuantity(item.categoryid,item.productid,item.size)}>+</button>
                  <button onClick={() => removeProductFromCart(item.categoryid,item.productid,item.size)}>Remove</button>
                </div>
              </div>
            </div>
          ))}

          {cart && cart.length>0 &&
            <>
          <div className="total-summary">
            <p>Total Items: {cart.length}</p>
            <p>Total Price: ${TotalValue}</p>
          </div>
          <button className="checkout-button" onClick={()=>window.location.href='/checkout'}>Checkout</button>
          </>

          }
        </>
      ) : (
        <p>No cart data</p>
      )}
    </div>
  );
};

export default Cart;
