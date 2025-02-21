import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { CiDeliveryTruck } from 'react-icons/ci';

const Hero = () => {

    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/SlideBanner`, {
                    headers: {
                        'APIKey' : apiKey
                    }
                });
                setBanners(response.data.data);
            } catch (err) {
                console.log('Error fetching categories', err)
            }
        }
        fetchBanner();
    }, [])

    const settings = {
        dots: false, // Add navigation dots
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1, // Number of slides to show at once
        slidesToScroll: 1, // Number of slides to scroll at a time
        pauseOnHover: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

  return (
    <div className='pt-32 w-full h-full'>
        <div className='w-full h-[80vh] overflow-hidden'>
            <Slider {...settings}>
                {banners.map((banner) => (
                    <div className='w-full h-[80vh] lg:h-full'>
                        <Link to={banner.buttonLink}>
                            <img className='w-full h-[80vh] lg:h-full object-cover' src={`https://admincwk.worldpos.biz/Uploads/${banner.slideBannerID}.jpg`} alt="" />
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
        <div className='w-[90%] xl:w-[70%] 2xl:w-[50%] mx-auto h-[80px] md:h-[90px] lg:h-[60px] grid grid-cols-2 lg:grid-cols-4 items-center justify-between'>
            <div className='flex gap-2 items-center justify-center'>
                <CiDeliveryTruck className='text-green text-2xl md:text-3xl'/>
                <p className='text-[12px] md:text-sm font-poppins'>Lorem, ipsum dolor.</p>
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <CiDeliveryTruck className='text-green text-2xl md:text-3xl'/>
                <p className='text-[12px] md:text-sm font-poppins'>Lorem, ipsum dolor.</p>
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <CiDeliveryTruck className='text-green text-2xl md:text-3xl'/>
                <p className='text-[12px] md:text-sm font-poppins'>Lorem, ipsum dolor.</p>
            </div>
            <div className='flex gap-2 items-center justify-center'>
                <CiDeliveryTruck className='text-green text-2xl md:text-3xl'/>
                <p className='text-[12px] md:text-sm font-poppins'>Lorem, ipsum dolor.</p>
            </div>
        </div>
    </div>
  )
}

export default Hero