import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const ShopByCategory = () => {
  return (
    <div className='w-full h-full'>
        <div className='flex justify-between items-center'>
            <div className='w-full bg-black/30 h-[1px]'/>
            <h1 className='text-black/80 w-full text-3xl text-center pt-5 font-overpass'>Shop By <span className='font-bold'>Category</span></h1>
            <div className='w-full bg-black/30 h-[1px]'/>
        </div>
        <div className='w-full h-[600px] mt-10 flex gap-2 px-2'>
            <div className='w-[850px] bg-white relative'>
                <img src="https://c4.wallpaperflare.com/wallpaper/690/88/859/chips-wallpaper-preview.jpg" className='w-full h-full object-cover' alt="" />
                <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                    <h1 className='text-4xl font-overpass text-white font-bold'>Snacs</h1>
                    <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quibusdam optio doloremque enim cupiditate ab reiciendis repellat amet obcaecati facere.</p>
                    <button className='px-4 mt-3 py-2 bg-white hover:bg-yellow hover:text-white duration-300 text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                </div>
            </div>
            <div className='w-[350px] relative'>
                <img src="https://static7.depositphotos.com/1021722/689/i/450/depositphotos_6896822-vegetables-on-a-wooden-table.jpg" className='w-full h-full object-cover' alt="" />
                <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                    <h1 className='text-4xl font-overpass text-white font-bold'>Veggie</h1>
                    <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    <button className='px-4 mt-3 py-2 bg-white hover:bg-yellow hover:text-white duration-300 text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                </div>
            </div>
            <div className='w-[700px] h-full grid grid-cols-2 gap-2'>
                <div className='w-full h-full relative overflow-hidden'>
                    <img src="https://i.pinimg.com/736x/c5/0f/4b/c50f4b27bed130f64cb4bf2258895514.jpg" className='w-full h-full object-cover' alt="" />
                    <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                        <h1 className='text-4xl font-overpass text-white font-bold'>Meat</h1>
                        <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                        <button className='px-4 mt-3 py-2 hover:bg-yellow hover:text-white duration-300 bg-white text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                    </div>
                </div>
                <div className='w-full h-full relative overflow-hidden'>
                    <img src="https://media.istockphoto.com/id/487402642/photo/fresh-juice.jpg?s=612x612&w=0&k=20&c=hjrPG05Pks54_dTutZEd31GIqua9LCG5-sOHMBHq-DA=" className='w-full h-full object-cover' alt="" />
                    <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                        <h1 className='text-4xl font-overpass text-white font-bold'>Juice</h1>
                        <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. </p>
                        <button className='px-4 mt-3 py-2 bg-white hover:bg-yellow hover:text-white duration-300 text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                    </div>
                </div>
                <div className='w-full h-full relative overflow-hidden'>
                    <img src="https://thumbs.dreamstime.com/b/stylish-colorful-background-different-cosmetics-products-digital-artwork-ai-generated-stylish-colorful-background-341060299.jpg" className='w-full h-full object-cover' alt="" />
                    <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                        <h1 className='text-4xl font-overpass text-white font-bold'>Cosmetics</h1>
                        <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum dolor consectetur sit, amet consectetur.</p>
                        <button className='px-4 mt-3 py-2 bg-white hover:bg-yellow hover:text-white duration-300 text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                    </div>
                </div>
                <div className='w-full h-full relative overflow-hidden'>
                    <img src="https://media.istockphoto.com/id/585591088/photo/energy-saving-led-lamp-and-several-old-light-bulbs.jpg?s=612x612&w=0&k=20&c=DVYEscQDo-lL9Jy7-tdEg3JfA9mwDSRpD6FcFPoBhwY=" className='w-full h-full object-cover' alt="" />
                    <div className='absolute bottom-0 left-0 bg-black/20 p-3'>
                        <h1 className='text-4xl font-overpass text-white font-bold'>Homeware</h1>
                        <p className='text-sm font-poppins text-white w-[80%]'>Lorem ipsum amet dolor sit, amet consectetur.</p>
                        <button className='px-4 mt-3 py-2 bg-white hover:bg-yellow hover:text-white duration-300 text-2xl rounded-tl-xl rounded-br-xl'><IoIosArrowForward /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShopByCategory