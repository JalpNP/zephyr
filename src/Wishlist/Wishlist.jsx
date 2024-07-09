import React, { useContext, useEffect, useState } from 'react';
import './Wishlist.scss';
import MyContext from '../Context/MyContext';

const Wishlist = () => {
  const { wish, setWish, removeProductFromWish, token } = useContext(MyContext);
  const [loading, setLoading] = useState(true);

  // for wish items fetching start
  useEffect(() => {
    if(!token){
      setLoading(false)
      return 
      
    }
    const fetchCartItems = async () => {
      try {
        const response = await fetch('https://expressd.vercel.app/wish', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      
        const data = await response.json();
        setWish(data.wishInfo);
        sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
      } catch (error) {
       alert('error')
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [setWish, token]);
  // for wish items fetching end

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wishlist-container">
      {wish && <h1>Wish Details</h1>}
      {wish && wish.length > 0 ? (
        <>
          {wish
            .sort((a, b) => b._id.localeCompare(a._id))
            .map((item) => (
              <div className="wishlist-item" key={item.productid}>
                <img src={item.productimg} alt={item.productname} className="wishlist-item-img" />
                <div className="wishlist-item-details">
                  <h3>{item.productname}</h3>
                  <p>Price: ${item.productprice}</p>
                  <div className="wishlist-item-controls">
                    <button onClick={() => removeProductFromWish(item.categoryid, item.productid)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
        </>
      ) : (
        <p>No wish data</p>
      )}
    </div>
  );
};

export default Wishlist;
