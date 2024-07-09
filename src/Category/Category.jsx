import React, { useContext } from 'react'
import './Category.scss'


import MyContext from '../Context/MyContext'
import { ArrowRight } from '@mui/icons-material'


const Category = () => {
   const{api,Navigate} =useContext(MyContext)


  return (
   
   
 
      <div className="category-contentp">
    {
       api && api.map((item) =>  <div className='category-card' >
     <div className='image'>
      <img src={item.img} alt=""  onClick={() => (Navigate(`/category/${item.route_category}`)) } /> 
</div>

      <h2>{item.route_category}<ArrowRight/></h2>
        </div>)
        
      }

</div>

     
  )
}


export default Category