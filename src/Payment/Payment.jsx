import React, { useContext } from 'react';
import MyContext from '../Context/MyContext';
import './Payment.scss';
import LoginError from '../Profile/LoginError/LoginError';

const Payment = () => {
  const {token,TotalValue,captcha, handleRefresh, handleSubmit, enter, setEnter, error } = useContext(MyContext);

  return (
<>
    {token ?
    <div className="payment-container">
    <h3>Total Value: ${TotalValue}</h3>
      <div className="captcha-box">
        {captcha}
      </div>
      <input
      type="text"
      value={enter}
      onChange={(e) => setEnter(e.target.value)}
      placeholder="Enter captcha"
      className="captcha-input"
    />
      <button className="refresh-button" onClick={handleRefresh}>Refresh</button>
      
    
      {error && <div className="error-message">invalid captcha </div>}
      <br />
      <button className="submit-button" onClick={handleSubmit}>Place Order</button>
    
    </div>:
    <LoginError title="Patment information" />
    }
    </>
  );
};

export default Payment;
