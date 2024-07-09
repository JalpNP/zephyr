import React, { useContext } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Contact.scss'
import { Button,} from '@mui/material';
import { CiMail } from "react-icons/ci";
import { IoPhonePortraitOutline } from "react-icons/io5";
 import MyContext from '../Context/MyContext';




const Contact = () => {
  
 
 
const {setOpenalert,setLoadingin,setMessage} = useContext(MyContext)




  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('**Name is required')
        .matches(/^([^0-9]*)$/, "**Don't allow Numeric Value"),
      email: Yup.string()
        .required('**Email is required')
        .email('**Enter a valid email'),
      mobile: Yup.string()
        .required('**Mobile number is required')
        .matches(/^[0-9]{10}$/, '**Mobile number is not valid'),
        message:Yup.string()
        .min(6,'min 6 words required')
        .max(30,'Too Long!!')
        .required('**Message is Required')
     
    }),
    onSubmit: async (values,  { resetForm }) => {
     
      setLoadingin(true)
  
   const response =   await fetch('https://expressd.vercel.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if(data.go==='success'){
     setMessage(data.message)
     setOpenalert(true)
      }else{
        setMessage(data.error)
        setOpenalert(true)
      }
      setLoadingin(false)
      resetForm()
    },
  });
  return (
      
    <div className='Register_main'>
   
    <h2 className='reg_heading'>WE WOULD LOVE TO HEAR FROM YOU</h2>


<div className="main">
    <form className='Register_form' onSubmit={formik.handleSubmit}>

      <label>
        <input
          type="text"
          placeholder='Name'
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
      </label>
      {formik.touched.name && formik.errors.name && (
        <div style={{ color: 'red' }}>{formik.errors.name}</div>
      )}

      <label>
        <input
          placeholder='Email'
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
      </label>
      {formik.touched.email && formik.errors.email && (
        <div style={{ color: 'red' }}>{formik.errors.email}</div>
      )}

      <label>
        <input
          type="text"
          placeholder='Mobile'
          name="mobile"
          value={formik.values.mobile}
          onChange={formik.handleChange}
        />
      </label>
      {formik.touched.mobile && formik.errors.mobile && (
        <div style={{ color: 'red' }}>{formik.errors.mobile}</div>
      )}

      <label>
        <textarea className='message'
          placeholder='Your Message for us'
          rows={3}
          cols={20}
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
      </label>
      {formik.touched.message && formik.errors.message && (
        <div style={{ color: 'red' }}>{formik.errors.message}</div>
      )}

      <Button className='reg_btn'  type="submit" variant="contained" >SUBMIT</Button>

    </form>
 


    <div className="info">
           <h3>INFORMATION</h3>
           <span>
            <CiMail /><h4>abc@gmail.com</h4></span>
          <span> <IoPhonePortraitOutline /><h4>+91987654321</h4>
           </span>
          </div>
    

  </div>
  </div>

);
};
  

export default Contact