import React from 'react'

import img2 from '..//Images/slider2.jpg'
import img3 from '..//Images/slider3.jpg'
import img4 from '..//Images/slider4.jpg'
import img5 from '..//Images/slider5.jpg'
import img6 from '..//Images/slider6.jpg'
import img7 from '..//Images/slider7.jpg'
import img8 from '..//Images/slider8.jpg'
import img10 from '..//Images/slider10.jpg'

import './Slider.scss'
const Slider = () => {
  return (
    <div className="slider">
        <div className="slides">
           
            <img src={img2} alt="Image2"/>
            <img src={img3} alt="Image3"/>
            <img src={img4} alt="Image4"/>
            <img src={img5} alt="Image5"/>
            <img src={img6} alt="Image6"/>
            <img src={img7} alt="Image7"/>
            <img src={img8} alt="Image8"/>
            <img src={img10} alt="Image10"/>
         
        </div>
    </div>
  )
}

export default Slider