import React, { useContext, useState } from 'react';
import MyContext from '../Context/MyContext';
import './Payment.scss';
import LoginError from '../Profile/LoginError/LoginError';

const Payment = () => {

  
  const {
    loadingin,
    token,
    TotalValue,
    handleupi,
  
  } = useContext(MyContext);

  
  const [open, setOpen] = useState(false);

  const handleOptionChange = () => {

    setOpen(true);
  };

  return (
    <>
      {token ? (
        <div className="pay_one">
          <h1>Select Payment Option</h1>
          <p>Total Price: ${TotalValue}</p>

          <div className="select">
           

            <div className="first">
              <label>
                <input
                  type="radio"
                  value="online"
                  onChange={handleOptionChange}
                />
                Pay online
                
              </label>
              { open && (
                <div className="upi">
                  <button
                    type="submit"
                    disabled={loadingin}
                    onClick={handleupi}
                  >
                    {loadingin ? "Processing..." : "Pay online"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoginError title="Payment information" />
      )}
    </>
  );
};

export default Payment;
