  import React, { useContext } from 'react'
import './Footer.scss'
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MyContext from '../Context/MyContext';
import axios from 'axios';




const Footer = () => {

  const{setLoadingin,setMessage,setOpenalert,apiUrl} = useContext(MyContext)

  
  const formik = useFormik({
    initialValues: {
      email: '',


    },
    validationSchema: yup.object({
      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),

    }),
    onSubmit: async (values, { resetForm }) => {
      setLoadingin(true);
      try {
        const { data } = await axios.post(
          `${apiUrl}/newlater`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            }
          }
        );
    
        if (data.success) {
          setOpenalert(true);
          setMessage(data.message);
          resetForm();
        } else {
          setOpenalert(true);
          setMessage(data.error);
        }
      } catch (error) {
        alert(error.response ? error.response.data.error : error.message);
      } finally {
        setLoadingin(false);
      }
    },
    

  });
    
    
 
  return (
    <div className='title'>
    
      <div className="main">
        <div className="first">
          <h3>About ZEPHYR</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Doloremque fugiat, nemo ea eaque, sit ipsa voluptas dolore quidem fugit ullam similique,<br /> magnam praesentium illum facilis a doloribus perferendis optio rem.</p>
         <br />
         
         <span><TwitterIcon/></span>
        
         <span><FacebookIcon/></span>
         <span><InstagramIcon/></span>
         <p>&copy; 2024  All rights reserved by ZEPHYR.</p>
        </div>

        <div className="news">
          <h3>Newsletter</h3>
          <form onSubmit={formik.handleSubmit} className='form'>
          <TextField 
id="email"
name="email"
placeholder='Enter your Email'
value={formik.values.email}
onChange={formik.handleChange}
error={formik.touched.email && Boolean(formik.errors.email)}
helperText={formik.touched.email && formik.errors.email} 
label="Email" 
variant="standard" />
 
 <Button variant="contained" type='submit'>Subscribe</Button>
     </form>
        </div>
        <div className="second">
             <h3>Company</h3>
             <li>About</li>
             <li>Features</li>
             <li>Work</li>
             <li>Carrer</li>
        </div>
        <div className="third">

          <h3>Help</h3>
          <li>Customer Suport</li>
          <li>Delivery Details</li>
          <li>Term & Conditions</li>
          <li>Privacy Policy</li>
        </div>
        <div className="last">

        </div>
      </div>
    </div>
     
     
  )
}

export default Footer