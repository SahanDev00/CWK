import React from 'react'
import { FaFacebookF, FaPhoneFlip } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTiktok } from "react-icons/io5";
import cardImage from '../../assets/cards.png'

const Footer = () => {
  return (
    <div className='w-full h-[450px] bg-amber mt-16'>
        <div className='w-full h-[80px] bg-amber' />

        {/* Newsletter */}
        <div className='w-[80%] mx-auto h-[50px] flex items-center justify-between'>
            <div>
                <h1 className='text-4xl font-bold font-karla text-white'>CWK</h1>
            </div>
            <div className='flex items-center'>
                <input className='w-[1100px] h-[50px] rounded-bl-2xl pl-4 outline-none focus:border border-amber' type="text" placeholder='Enter your email to subscribe to our newletter...'/>
                <button className='bg-yellow px-6 text-sm h-[50px] rounded-tr-2xl text-white font-poppins'>Submit</button>
            </div>
            <div className='flex items-center justify-center text-white gap-3'>
                <FaFacebookF className='text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[40px] h-[50px] p-3'/>
                <FiInstagram className='text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[40px] h-[50px] p-2'/>
                <IoLogoTiktok className='text-2xl rounded-tr-xl rounded-bl-2xl hover:bg-white hover:text-black cursor-pointer w-[40px] h-[50px] p-2'/>
            </div>
        </div>

        {/* Content */}
        <div className='w-[80%] mx-auto h-[200px] mt-10 flex items-center'>
            <div className='w-[700px]'>
                <h1 className='text-xl text-black/70 font-poppins'>No.01, Example Street, Example, Example, Example</h1>
                <div className='flex gap-3 mt-4 items-center'>
                    <FaPhoneFlip className='text-2xl text-white'/>
                    <p className=' text-xl font-bold font-overpass text-white'>+94 12 344 5785</p>
                </div>
                <p className='mt-1 text-black/80 font-poppins'>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className='w-full grid grid-cols-4'>
                <div className='w-full'>
                    <h1 className='text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h1 className='text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h1 className='text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
                <div className='w-full'>
                    <h1 className='text-xl font-semibold font-overpass text-white mb-2'>Quick Links</h1>
                    <ul>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                        <li className='text-black/60 font-roboto'>Lorem, ipsum dolor.</li>
                    </ul>
                </div>
            </div>
        </div>

        <div className='w-full h-[80px] bg-black/80'>
            <div className='w-[80%] h-full mx-auto flex items-center justify-between'>
                <h1 className='text-white font-roboto'>Copyright © 2025 Exesmart (Pvt) Ltd. All Rights Reserved</h1>
                <div className='flex h-full items-center gap-2'>
                    <img className='h-full py-5' src={cardImage}  alt="" />
                </div>
            </div>
        </div>  
    </div>
  )
}

export default Footer