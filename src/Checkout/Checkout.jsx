import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Checkout.scss';
import LoginError from '../Profile/LoginError/LoginError';
import MyContext from '../Context/MyContext';

const Checkout = ({show}) => {
  const { edit, setEdit, token, shipping, setShipping, loadingin, setLoadingin, setOpenalert, setMessage } = useContext(MyContext);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if(!token){
      setLoader(false)
      return
     
    }
    const fetchShippingData = async () => {
      try {
        const response = await fetch('https://expressd.vercel.app/get-user-address', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setShipping(data.shippingInfo);
        sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo));
      } catch (error) {
        console.error('Failed to fetch account details:', error);
      } finally {
        setLoader(false);
      }
    };

    fetchShippingData();
  }, [setShipping, token]);

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {token ? (
        edit ? (
          <Formik
            initialValues={{
              name: shipping.name || '',
              email: shipping.email || '',
              mobile: shipping.mobile || '',
              address: shipping.address || '',
              state: shipping.state || '',
              pincode: shipping.pincode || '',
              landmark: shipping.landmark || '',
              city: shipping.city || '',
            }}
            validationSchema={Yup.object({
              name: Yup.string().required('Name is required'),
              email: Yup.string().email('Invalid email address').required('Email is required'),
              mobile: Yup.string().required('Mobile number is required'),
              address: Yup.string().required('Address is required'),
              state: Yup.string().required('State is required'),
              pincode: Yup.string().required('Pincode is required'),
              landmark: Yup.string().required('Landmark is required'),
              city: Yup.string().required('City is required'),
            })}
            onSubmit={async (values) => {
              setLoadingin(true);
              const response = await fetch('https://expressd.vercel.app/save-shipping-info', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(values),
              });

              const data = await response.json();

              if (data.success) {
                setOpenalert(true);
                setMessage(data.message);
                setShipping(data.shippingInfo);
                sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo));
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              } else {
                setOpenalert(true);
                setMessage(data.error);
              }
              setLoadingin(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className='ship-main'>
                <h2>Update Shipping Details</h2>
                <div className='name-form'>
                  <div className='name-input'>
                    <label htmlFor='name'>Name:</label>
                    <Field type='text' name='name' />
                    <ErrorMessage name='name' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='email'>Email:</label>
                    <Field type='text' name='email' />
                    <ErrorMessage name='email' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='mobile'>Mobile:</label>
                    <Field type='text' name='mobile' />
                    <ErrorMessage name='mobile' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='address'>Address:</label>
                    <Field type='text' name='address' />
                    <ErrorMessage name='address' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='state'>State:</label>
                    <Field type='text' name='state' />
                    <ErrorMessage name='state' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='pincode'>Pincode:</label>
                    <Field type='text' name='pincode' />
                    <ErrorMessage name='pincode' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='landmark'>Landmark:</label>
                    <Field type='text' name='landmark' />
                    <ErrorMessage name='landmark' component='div' className='error-message' />
                  </div>

                  <div className='name-input'>
                    <label htmlFor='city'>City:</label>
                    <Field type='text' name='city' />
                    <ErrorMessage name='city' component='div' className='error-message' />
                  </div>

                  <button type='submit' disabled={isSubmitting}>
                    {loadingin ? 'Wait...' : 'Submit'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <div className='shipping-details'>
            <h2>Shipping Information</h2>

            {shipping && shipping.address ?
            <>
            <p><strong>Name:</strong> {shipping && shipping.name}</p>
            <p><strong>Email:</strong> {shipping && shipping.email}</p>
            <p><strong>Mobile:</strong> {shipping && shipping.mobile}</p>
            <p><strong>Address:</strong> {shipping && shipping.address}</p>
            <p><strong>State:</strong> {shipping && shipping.state}</p>
            <p><strong>Pincode:</strong> {shipping && shipping.pincode}</p>
            <p><strong>Landmark:</strong> {shipping && shipping.landmark}</p>
            <p><strong>City:</strong> {shipping && shipping.city}</p>
            </>:
            <p>add new Shipping Details</p>
            }
            <button onClick={() => setEdit(true)}>{shipping && shipping.address ? 'Edit' :'Add New'}</button>
          { !edit && shipping && shipping.address && show && <button className='pay' onClick={() => window.location.href='/payment'}>Confirm</button>}
          </div>
        )
      ) : (
        <LoginError title="Shipping information" />
      )}
    </>
  );
};

export default Checkout;
