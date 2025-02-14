import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Deals = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API
  const [error, setError] = useState(null); // Error state for API

  const settings = {
    dots: true, // Add navigation dots
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 3, // Number of slides to scroll at a time
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/Item?IsSpecial=y`, {
          headers: {
            'APIKey': apiKey,
          },
        });
        setItems(response.data.data);
      } catch (err) {
        setError('Error fetching items');
        console.log('Error fetching categories', err);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };
    fetchItems();
  }, []);

  return (
    <div className='w-full h-[350px] mt-5'>
      <div className='w-[80%] mx-auto relative'>
        <div className='bg-yellow w-full h-[200px] rounded-t-[80px]'>
          <h1 className='text-white text-2xl font-bold text-center pt-5'>Super Deals</h1>
        </div>

        {/* Show loading or error states */}
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl">Loading...</p>
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-xl text-red">{error}</p>
          </div>
        ) : (
          <div className='absolute w-full h-full inset-0 top-1/3 p-5'>
            {/* Slider for items */}
            <Slider {...settings}>
              {items.map((item) => (
                <div className='w-full h-full p-4 bg-gray/80 rounded-lg shadow-lg'>
                  {/* Image */}
                  <div className="w-full h-[200px] bg-gray mb-4">
                    <img
                      src={`https://admincwk.worldpos.biz/Uploads/${item.itemID}`}
                      alt={item.itemName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Item Info */}
                  <p className='text-lg font-semibold'>{item.itemName}</p>
                  <p className='mt-1 text-lg font-bold text-green'>Rs. {item.retailPrice}</p>
                  <button className='mt-4 w-full py-2 bg-blue text-white rounded-md'>
                    Add to Cart
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
