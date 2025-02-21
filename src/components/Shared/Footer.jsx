import React from 'react'
import { FaFacebookF, FaPhoneFlip } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTiktok } from "react-icons/io5";
import cardImage from '../../assets/cards.png'

const Footer = () => {
  return (
    <div className='w-full bg-amber mt-16'>
        <div className='w-full h-[80px] bg-amber' />

        {/* Newsletter */}
        <div className='md:w-[90%] lg:w-[80%] mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6'>
            <div>
                <h1 className='text-4xl font-bold font-karla text-white'>CWK</h1>
            </div>
            <div className='flex items-center w-full md:w-auto mt-4 md:mt-0'>
                <input 
                  className='w-full md:w-[400px] lg:w-[500px] xl:w-[650px] 2xl:w-[1100px] h-[50px] rounded-bl-2xl pl-4 outline-none focus:border border-amber text-sm' 
                  type="text" 
                  placeholder='Enter your email to subscribe...'
                />
                <button className='bg-yellow px-4 md:px-6 text-sm h-[50px] rounded-tr-2xl text-white font-poppins md:w-auto md:mt-0'>Submit</button>
            </div>
            <div className='flex items-center justify-center text-white gap-3 mt-4 md:mt-0'>
                <FaFacebookF className='text-lg lg:text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[30px] lg:w-[40px] h-[30px] lg:h-[50px] lg:p-3 p-1'/>
                <FiInstagram className='text-lg lg:text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[30px] lg:w-[40px] h-[30px] lg:h-[50px] lg:p-2 p-1'/>
                <IoLogoTiktok className='text-lg lg:text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[30px] lg:w-[40px] h-[30px] lg:h-[50px] lg:p-2 p-1'/>
            </div>
        </div>

        {/* Content */}
        <div className='w-[90%] mx-auto mt-10 flex flex-col lg:flex-row items-center gap-6 px-4'>
            <div className='w-full lg:w-[700px]'>
                <h1 className='text-lg md:text-xl text-black/70 font-poppins'>No.01, Example Street, Example, Example, Example</h1>
                <div className='flex gap-3 mt-4 items-center'>
                    <FaPhoneFlip className='text-2xl text-white'/>
                    <p className='text-lg sm:text-xl font-bold font-overpass text-white'>+94 12 344 5785</p>
                </div>
                <p className='mt-1 text-black/80 font-poppins'>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                <div className='w-full'>
                    <h1 className='text-lg sm:text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h1 className='text-lg sm:text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h1 className='text-lg sm:text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* Bottom Footer */}
        <div className='w-full bg-black/80 mt-10 py-4'>
            <div className='w-[90%] mx-auto flex flex-wrap justify-between items-center px-4'>
                <h1 className='text-white font-roboto text-center sm:text-left w-full sm:w-auto'>Copyright © 2025 Exesmart (Pvt) Ltd. All Rights Reserved</h1>
                <div className='flex justify-center sm:justify-end w-full sm:w-auto mt-2 sm:mt-0'>
                    <img className='h-10' src={cardImage} alt="Payment Methods" />
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Footer
