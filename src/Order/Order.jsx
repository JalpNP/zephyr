import React, { useContext, useEffect, useState } from 'react';
import './Order.scss';
import MyContext from '../Context/MyContext';
import axios from 'axios';

const Order = () => {
  const {apiUrl, order, setOrder, token } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  // Fetch order items on component mount
  useEffect(() => {
 
  
    const fetchOrderItems = async () => {

      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await axios.get(`${apiUrl}/order`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setOrder(data.orderInfo);
        sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
      } catch (error) {
        console.error('Failed to fetch order details:', error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderItems();
  }, [token, apiUrl, setOrder]);
  



  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="order-container">
    {order &&  <h1>order Details</h1>}
      {order && order.length > 0 ? (
        <>
          {order
            .sort((a,b)=>b._id.localeCompare(a._id))
            .map((item) => (
            <div className="order-item" key={item._id}>
          
              <img src={item.productimg} alt={item.productname} className="order-item-img" />
              <div className="order-item-details">
              <p>Order Date: {item.orderDate.slice(0,10)}</p>
                <h3>{item.productname}</h3>
                <p>Price: ${item.productprice}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Order ID: {item._id.slice(-4)}</p>
              </div>
            </div>
          ))}
        
        </>
      ) : (
        <p>No Order data</p>
      )}
    </div>
  );
};

export default Order;
