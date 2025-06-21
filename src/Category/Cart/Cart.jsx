import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../Context/MyContext';
import './Cart.scss';
import axios from 'axios';

const Cart = () => {
  const { cart, setCart,apiUrl,removeProductFromCart,handleIncreaseQuantity,handleDecreaseQuantity,TotalValue,token } = useContext(MyContext);
  const[loading,setLoading] = useState(true)

  // for cartitems fetching start
  useEffect(() => {
  
  
    const fetchCartItems = async () => {

      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${apiUrl}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setCart(data.cartInfo);
        sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      }  catch (error) {
        console.error('Failed to fetch cart details:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCartItems();
  }, [token,apiUrl,setCart]); 
  
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
