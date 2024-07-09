import React, { useEffect, useState } from 'react'
import MyContext from './MyContext'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const MyContextProvider = ({children}) => {


       //for api calling start
const[api,setApi] = useState([])
useEffect(() =>{
  axios.get('https://expressd.vercel.app/api/data')
  .then((a) =>setApi(a.data.data))
},[])
// for api calling end



  // location common
const location = useLocation()  
// for location end

// for navigation start
const Navigate = useNavigate()
// for navigation end

// for serch open search bar start
const[opensearch,setOpensearch] =useState(false)
// for serch open search bar end

// for save input value-search start
const[input,setInput]=useState("") 
// for save input value-search end

// for login open state start
const [openmodal, setOpenmodal] = useState(false);
// for login open state end



// for show login first and hide regiter start
const[showSignin,setShowSignin] =useState(false)
// for show login first and hide regiter end




// for open modal login start
const handleLoginOpen = () =>{
  setOpenmodal(true)
  document.querySelector('body').style.overflow="hidden"
}
// for open modal login end





  // for close modal login start
const handleLoginClose = () =>{
  setOpenmodal(false)
  setShowSignin(false)
  document.querySelector('body').style.overflow="auto"
}
 // for close modal login end


//  for open register start
 const openregister =()=>{
  setShowSignin(!showSignin)
  }

  //  for open register end







// for open account modal start
const [details,setDetails] =useState(false)
// for open account modal end



// for token save state start
const [token,setToken] = useState(()=>{
  const storedToken = sessionStorage.getItem('token');
  return storedToken? storedToken:''
}) 


// for token save state end


// for user login start
const handleLogin = (data) =>{

setMessage(data.loginmessage)
setToken(data.data)
sessionStorage.setItem('token',data.data)
sessionStorage.setItem('userdata', JSON.stringify(data.accountInfo));
sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
sessionStorage.setItem('shipping', JSON.stringify(data.shippingInfo));
sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
setUserdata(data.accountInfo)
setShipping(data.shippingInfo)
setCart(data.cartInfo)
setWish(data.wishInfo)
setOrder(data.orderInfo)
setOpenalert(true)
handleLoginClose()

}
// for user login end


// for user logout start
const handleLogout = () => {
  const confirmed = window.confirm('Are you sure you want to log out?');
  if (confirmed) {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userdata');
  sessionStorage.removeItem('cart');
  sessionStorage.removeItem('wish');
  sessionStorage.removeItem('shipping');
  sessionStorage.removeItem('order');
  setToken('');
  setUserdata(null)
  setCart([])
  setShipping(null)
  setWish([])
  setOrder([])
  setDetails(false)
  window.location.reload()
  }
  };
  // for user logout end

// for form submiting loader open state start
  const[loadingin,setLoadingin] =useState(false)
  // for form submiting loader open state end

// for saving message from backend state start
  const [message,setMessage] = useState('')
  // for saving message from backend state end

// show sneckbar for success and alert state start
  const [openalert,setOpenalert] = useState(false)
  // show sneckbar for success and alert state end


  // for sorting product state start
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };
    // for sorting product state end
 
// for show size error start
    const[issize,setIssize]=useState(false)
    // for show size error end


    // for store size state start 
    const [size,setSize] = useState('')
    // for store size state end
  

    // for clicking on size button start
    const showSize = (s) =>{
      setSize(s)
      setIssize(false)
    }
// for clicking on size button end



// for account data save state start
const [userdata, setUserdata] = useState(() => {
  const storedUserData = sessionStorage.getItem('userdata');
  return storedUserData? JSON.parse(storedUserData):null
});

// for account data save state end



// for edit users information state start
const [edit, setEdit] = useState(false);
// for edit users information state end






// for save cart data state start
const [cart, setCart] = useState(() => {
  const savedCart = sessionStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
});
// for save cart data state end





// FOR ADD TO CART PROCESS START
const handleCart = async(categoryid,productid,productimg,productname,productprice) =>{
  if(!token){
setMessage('please login first')
setOpenalert(true)
setTimeout(() => {
handleLoginOpen()
}, (3000));
return;
  }

  if(!size){
   setIssize(true)
   return
  }

   setLoadingin(true)
   const response = await fetch('https://expressd.vercel.app/add-to-cart', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({categoryid,productid,productimg,productname,productprice,size})
   })

   const data = await response.json()

   if(data.success){
     setMessage(data.message)
     sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
     setCart(data.cartInfo)
     setOpenalert(true)
     setSize('')
   }else{
     setMessage(data.error)
     setOpenalert(true)
     setSize('')
   }
   setLoadingin(false)
  
 }

 // FOR ADD TO CART PROCESS end


 // remove product from cart start

const removeProductFromCart = async (categoryid,productid,size) => {
  try {

    setLoadingin(true)
    const response = await fetch('https://expressd.vercel.app/remove-from-cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      setMessage(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)
      setOpenalert(true)
  
    }else{
      setMessage(data.error)
      setOpenalert(true)
   
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoadingin(false)
  }
};
// remove product from cart end


// for increase quantity in cart start
const handleIncreaseQuantity = async (categoryid,productid,size) => {
  try {

    setLoadingin(true)
    const response = await fetch('https://expressd.vercel.app/increase-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      setMessage(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)
      setOpenalert(true)
   
    }else{
      setMessage(data.error)
      setOpenalert(true)
     
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoadingin(false)
  }
};

// for increase quantity in cart end


// for decrease quantity in cart start
const handleDecreaseQuantity = async (categoryid,productid,size) => {
  try {

    setLoadingin(true)
    const response = await fetch('https://expressd.vercel.app/decrease-quantity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid,size })
    });

    const data = await response.json();
    if(data.success){
      setMessage(data.message)
      sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
      setCart(data.cartInfo)
      setOpenalert(true)
    
    }else{
      setMessage(data.error)
      setOpenalert(true)
    
    }
    
    
  } catch (error) {
    console.error('Error removing from cart:', error);
    // Handle error
  }finally{
    setLoadingin(false)
  }
};

// for decrease quantity in cart end


 // total value start
const TotalValue =cart && cart.reduce((acc, item) => acc + (item.productprice * item.quantity), 0);
// total value end


 // show go to cart start
const isProductInCart = (categoryid,productid) => {
  if (cart) {
      return cart.find(item =>item.categoryid===categoryid && item.productid === productid && item.size===size);
  }
  return false;
};

// show go to cart end

// for wish list  start
const [wish, setWish] = useState(() => {
  const savedwish = sessionStorage.getItem('wish');
  return savedwish ? JSON.parse(savedwish) : [];
});
// for wish list  end


// FOR ADD TO Wish PROCESS START
const handlewish = async(categoryid,productid,productimg,productname,productprice) =>{
  if(!token){
setMessage('please login first')
setOpenalert(true)
setTimeout(() => {
handleLoginOpen()
}, (3000));
return;
  }


   setLoadingin(true)
   const response = await fetch('https://expressd.vercel.app/add-to-wish', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${token}`
     },
     body: JSON.stringify({categoryid,productid,productimg,productname,productprice})
   })

   const data = await response.json()

   if(data.success){
     setMessage(data.message)
     sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
     setWish(data.wishInfo)
     setOpenalert(true)

   }else{
     setMessage(data.error)
     setOpenalert(true)
   
   }
   setLoadingin(false)
  
 }

 // FOR ADD TO Wish PROCESS end



  // remove product from cart start

const removeProductFromWish = async (categoryid,productid) => {
  try {

    setLoadingin(true)
    const response = await fetch('https://expressd.vercel.app/remove-from-wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ categoryid,productid })
    });

    const data = await response.json();
    if(data.success){
      setMessage(data.message)
      sessionStorage.setItem('wish', JSON.stringify(data.wishInfo));
      setWish(data.wishInfo)
      setOpenalert(true)
    
    }else{
      setMessage(data.error)
      setOpenalert(true)
     
    }
    
    
  } catch (error) {
    console.error('Error removing from wish:', error);
    // Handle error
  }finally{
    setLoadingin(false)
  }
};
// remove product from cart end


 // show go to wish start
 const isProductInWish = (categoryid,productid) => {
  if (wish) {
      return wish.find(item =>item.categoryid===categoryid && item.productid === productid );
  }
  return false;
};

// show go to wish end

// for shipping data save state start
const [shipping, setShipping] = useState(()=>{
  const storedShipping = sessionStorage.getItem('shipping');
  return storedShipping? JSON.parse(storedShipping):null
})


// for shipping data save state end

// for single image  position state start
 const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
 // for single image  position state end


//  for single big image show hidden state start
 const [show, setShow] = useState(false);
 //  for single big image show hidden state end
 

//  for single mouse move start
 const handleMouseMove = (event) => {
 const image = document.getElementById('imgpp');
 const rect = image.getBoundingClientRect();
 const x = event.clientX - rect.left - 25; 
 const y = event.clientY - rect.top - 25; 
 
 setCursorPosition({ x, y });
 };
 //  for single mouse move end

 
//  for save src of single image hover start
 const[big,setBig] =useState('')
 //  for save src of single image hover end


// for show big hover image start
 const handletime = () =>{
    setShow(true)
setBig(document.getElementById('imgpp').src)
}
// for show big hover image end


// for multiple side image hover start
      const handleimg = (img) =>{
document.getElementById('imgpp').src=img
      }
      // for multiple side image hover end



     //for social sharing link start
     const shareToWhatsApp = () => {
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`;
      window.open(url);
   }
  
    const shareToLinkedIn = () => {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
      window.open(url);
    }
  
    const shareToTwitter = () => {
      const url = `http://www.twitter.com/share?url=${encodeURIComponent(window.location.href)}`;
      window.open(url);
    }

    //for social sharing link end



    
// for order list  start
const [order, setOrder] = useState(() => {
  const savedorder = sessionStorage.getItem('wish');
  return savedorder ? JSON.parse(savedorder) : [];
});
// for order list  end



// for payment option start\


const  generateCaptcha = () =>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [enter, setEnter] = useState('');
    const [error, setError] = useState(false);

  
  
    const handleRefresh = () => {
      setCaptcha(generateCaptcha());
      setEnter('')
      setError(false)
    };
  
    const handleSubmit = async () => {
      if (enter === captcha) {
        setEnter('');
        setLoadingin(true);
    
        try {
          const response = await fetch('https://expressd.vercel.app/add-to-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ orderDate: new Date() })
          });
    
          const data = await response.json();
    
          if (data.success) {
            setMessage(data.message);
            sessionStorage.setItem('cart', JSON.stringify(data.cartInfo));
            sessionStorage.setItem('order', JSON.stringify(data.orderInfo));
            setCart(data.cartInfo);
            setOrder(data.orderInfo);
            setOpenalert(true);
            window.location.href='/confirm'
          } else {
            setMessage(data.error);
            setOpenalert(true);
          }
        } catch (error) {
          console.error('Error during order submission:', error);
          setMessage('An error occurred while processing your order. Please try again.');
          setOpenalert(true);
        } finally {
          setLoadingin(false);
        }
      } else {
        setError(true);
        setCaptcha(generateCaptcha());
      }
    };
    

    // for payment option end
 

  
    
   
  
   


   
 





     

   



      


 


      
  



  return (
    <div>

    <MyContext.Provider value={{order, setOrder,handleSubmit,handleRefresh,error, setError,enter, setEnter,captcha, setCaptcha,handlewish,TotalValue,shipping,setShipping,removeProductFromWish,isProductInWish,isProductInCart,wish,setWish,handleIncreaseQuantity,handleDecreaseQuantity,removeProductFromCart,edit, setEdit,userdata,setUserdata,cart,handleLogin, setCart,location,handletime,shareToWhatsApp,shareToLinkedIn,shareToTwitter ,big,setBig,handleMouseMove,show, setShow,cursorPosition, setCursorPosition,size,showSize,setSize,handleCart,issize,setIssize,handleSortChange,sortOrder,setSortOrder,handleimg,api,token,opensearch,setOpensearch,setToken,openalert,setOpenalert,Navigate,openregister ,handleLoginClose,openmodal,setOpenmodal,handleLoginOpen,showSignin,setShowSignin,
            message,setMessage,handleLogout,
             input,setInput,loadingin,setLoadingin
            ,details,setDetails,
            }}>
{children}
        </MyContext.Provider>
    </div>
  )
}

export default MyContextProvider