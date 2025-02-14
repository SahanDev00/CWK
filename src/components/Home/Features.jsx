import React from 'react'

const Features = () => {
  return (
    <div className='w-full h-auto pt-3 pb-5'>
        <div className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div className='relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg group'>
                <img 
                    src="https://www.mdanderson.org/cancerwise/2023/10/healthy-foods-to-eat-during-cancer-treatment/jcr:content/blog/adaptiveimage.resize.702.404.jpg" 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                    alt="Feature"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white'>
                    <h1 className='text-2xl font-bold font-overpass'>Test Name</h1>
                    <p className='mt-2 text-sm font-poppins'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dolor.</p>
                    <button className='mt-4 px-4 py-2 bg-red font-roboto text-white rounded-full hover:bg-red/80 transition'>
                        Test Button
                    </button>
                </div>
            </div>

            <div className='relative w-full h-[300px] rounded-xl overflow-hidden shadow-lg group'>
                <img 
                    src="https://d2jx2rerrg6sh3.cloudfront.net/images/news/ImageForNews_771049_17071842326584199.jpg" 
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105' 
                    alt="Feature"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white'>
                    <h1 className='text-2xl font-bold font-overpass'>Test Name</h1>
                    <p className='mt-2 text-sm font-poppins'>Lorem ipsum dolor sit amet consectetur adipisicing elit. A, dolor.</p>
                    <button className='mt-4 px-4 py-2 bg-red font-roboto text-white rounded-full hover:bg-red/80 transition'>
                        Test Button
                    </button>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default Features
