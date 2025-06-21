import React from 'react'
import './App.scss'
import { Routes,Route, HashRouter } from 'react-router-dom'
import Home from '../Home/Home'
import Header from '../Common/Header/Header'
import Contact from '../Contact/Contact'
import Wishlist from '../Wishlist/Wishlist'
import Tshirt from '../Category/Tshirt'
import SingleProduct from '../Category/SingleProduct'
import Nopage from '../No-page/Nopage'
import MyContextProvider from '../Context/MyContextProvider'
import Checkout from '../Checkout/Checkout'
import Footer from '../Footer/Footer'
import Loading from '../Home/Loading'
import Alert from '../Common/Alert/Alert'
import ScrollToTop from 'react-scroll-to-top'
import { ArrowUpward } from '@mui/icons-material'
import GoToTop from '../Common/Gototop'
import Account from '../Profile/Account/Account'
import Cart from '../Category/Cart/Cart'
import Payment from '../Payment/Payment'
import Confirm from '../Confirm/Confirm'
import Order from '../Order/Order'




const App = () => {




  return (


    <HashRouter>

      <MyContextProvider>

        <GoToTop />
        <Header />


        <Loading />
        <Alert />
        <Routes>


          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<Nopage/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/category/:product' element={<Tshirt/>}/>
          <Route path='/category/:product/:single' element={<SingleProduct/>}/>
          <Route path='/account-details' element={<Account/>}/>
          <Route path='/wish' element={<Wishlist/>}/>
          <Route path='/checkout' element={<Checkout show={true}/>}/>
          <Route path='/shipping-details' element={<Checkout show={false}/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path='/confirm' element={<Confirm/>}/>
          <Route path='/order' element={<Order/>}/>
      
           
        
          
          

           
           
           
           
         
        
         
          
            

        </Routes>
        <Footer />
        <ScrollToTop className='scrolltop' smooth component={<ArrowUpward />} />
      </MyContextProvider>


    </HashRouter>

  )
}

export default App