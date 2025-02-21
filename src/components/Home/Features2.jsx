import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const Features2 = () => {
  return (
    <div className='w-full md:h-[300px] mt-16 grid md:grid-cols-2 overflow-hidden'>
        <div className='w-full lg:h-[300px] relative'>
            <img src="https://static.vecteezy.com/system/resources/previews/013/446/670/non_2x/a-supermarket-cart-with-wooden-houses-stands-on-a-yellow-background-the-concept-of-home-shopping-and-marketing-commerce-and-trade-affordable-housing-investment-in-real-estate-banner-photo.jpg" alt="" className='w-full h-full object-cover' />
            <div className='w-full absolute h-full flex flex-col justify-center items-end p-5 inset-0 bg-black/10'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-karla font-bold'>Lorem, ipsum.</h1>
                <button className='px-3 py-2 text-2xl mt-3 bg-white md:w-[100px] rounded-tr-2xl rounded-bl-2xl flex items-center
                 justify-center font-bold hover:bg-amber600 duration-300 hover:text-white'><IoIosArrowForward /></button>
            </div>
        </div>
        <div className='w-full mt-4 md:mt-0 lg:h-[300px] relative'>
            <img src="https://static.vecteezy.com/system/resources/previews/013/446/670/non_2x/a-supermarket-cart-with-wooden-houses-stands-on-a-yellow-background-the-concept-of-home-shopping-and-marketing-commerce-and-trade-affordable-housing-investment-in-real-estate-banner-photo.jpg" alt="" className='w-full h-full object-cover' />
            <div className='w-full absolute h-full flex flex-col justify-center items-end p-5 inset-0 bg-black/10'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-karla font-bold'>Lorem, ipsum.</h1>
                <button className='px-3 py-2 text-2xl mt-3 bg-white md:w-[100px] rounded-tr-2xl rounded-bl-2xl flex items-center
                 justify-center font-bold hover:bg-amber600 duration-300 hover:text-white'><IoIosArrowForward /></button>
            </div>
        </div>
    </div>
  )
}

export default Features2