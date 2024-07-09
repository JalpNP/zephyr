  import React, { useContext } from 'react' 
  import './Header.scss' 
  import FavoriteIcon from '@mui/icons-material/Favorite'; 
  import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
  import PersonIcon from '@mui/icons-material/Person'; 
  import SearchIcon from '@mui/icons-material/Search';  
  import CloseIcon from '@mui/icons-material/Close';
  import MyContext from '../../Context/MyContext';
  import Modal from '../../Modal/Modal';
import { LocalShipping, LogoutOutlined, TurnSlightRight, VerifiedUser } from '@mui/icons-material';
 




  

  const Header = () => { 

  

  
  
    const {wish,cart,token,userdata,api,details,opensearch,setOpensearch,setDetails,handleLoginOpen,handleLogout,Navigate,input,setInput,openmodal} = useContext(MyContext)
  

   
   
  
  return ( 
    <>
    <div className='head'> 
      <div className="left" onClick={() =>Navigate('/')}> 
     ZEPHYR 
      </div> 
      
      <div className="right">  

      {  opensearch &&
        <div className='search-anim'>
          <div className='search-bar'><span><SearchIcon/></span> <input type="text" placeholder='Search on Zephyr...' value={input} onChange={(e) => setInput(e.target.value)} />
          <div class="search-list">
{
  api
  .filter((b) =>{
    const newjson = b.category.toLowerCase()
    const newinput = input.toLowerCase()
    return(
newinput && newjson.startsWith(newinput)
    )
  })
 .map((a) =>{
    return(
<li onClick={() => Navigate(`/category/${a.route_category}`) || setInput('') || setOpensearch(false)}>{a.category}</li>
    )
  })


  }

</div>
          </div>

      </div>}
      {!opensearch?
      <span  onClick={() => setOpensearch(true) } ><SearchIcon/></span> :
      <span  onClick={() => setOpensearch(false) || setInput('') } ><CloseIcon/></span>
      }
        <span onClick={() => window.location.href='/wish'}><FavoriteIcon style={{ color: wish && wish.length>0 && 'pink' }}/></span> 
       
     
        <span className="scart" onClick={() => window.location.href='/cart'}> <ShoppingCartIcon/><b>{cart?.length || 0}</b></span>
        
       
{  !token ? <span onClick={handleLoginOpen} ><PersonIcon/></span>:
        <div className='nameo' onClick={() =>  setDetails(!details)} ><strong>{userdata && userdata.name}</strong>Account</div>}
      

    { details &&
       <div class="account-show" >
    
        <li onClick={() => window.location.href='/account-details'}>
          <span><VerifiedUser/></span>
          <span class="text">Account-Details</span>
          </li>
          <li onClick={()=>window.location.href='/shipping-details'}>

          <span><LocalShipping/></span>
          <span class="text">Shipping-Details</span>
        </li>

        <li onClick={()=>window.location.href='/order'}>
          <span><TurnSlightRight/></span>
          <span class="text">Order-details</span>
        </li>
        <li onClick={handleLogout}>
          <span><LogoutOutlined/></span>
          <span class="text" >Logout</span>
        </li>
      

       
       </div>}
      
      </div>
    </div>


    
   
    

    <div className='search-mobile'><span><SearchIcon/></span> <input type="text" placeholder='Search on Zephyr...' value={input} onChange={(e) => setInput(e.target.value)} />
   
    <div class="searchlistmobile">
    {
  api
  .filter((b) =>{
    const newjson = b.category.toLowerCase()
    const newinput = input.toLowerCase()
    return(
newinput && newjson.startsWith(newinput)
    )
  })
 .map((a) =>{
    return(
<li onClick={() => Navigate(`/category/${a.route_category}`) || setInput('') || setOpensearch(false)}>{a.category}</li>
    )
  })


  }

</div>
    </div>



    {openmodal && <Modal/>}

    </>
    )
  }

  export default Header