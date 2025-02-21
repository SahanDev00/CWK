import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const BestSellers = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for API
  const [error, setError] = useState(null); // Error state for API
  const { addToCart } = useCart();

  const settings = {
    dots: true, // Add navigation dots
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5, // Number of slides to show at once
    slidesToScroll: 3, // Number of slides to scroll at a time
    pauseOnHover: true,
    centerMode: true, // Enables partial visibility and spacing
    centerPadding: "20px", // Adjust space between slides
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "10px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "5px",
        },
      },
    ],
  };
  

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/Item?IsNew=y`, {
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

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      quantity: 1,
    });
    toast.success(item.itemName + ' Added To The Cart!', {
      toastId: 1,
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className='w-full mt-[350px]'>
      <div className='w-[95%] mx-auto'>
        <div className='flex justify-between items-center'>
            <div className='w-full bg-black/30 h-[1px]'/>
            <h1 className='text-black/80 w-full text-3xl text-center pt-5 font-overpass'>Best <span className='font-bold'>Sellers</span></h1>
            <div className='w-full bg-black/30 h-[1px]'/>
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
          <div className='w-full h-full inset-0 top-1/3 p-5 mt-5'>
            {/* Slider for items */}
            <Slider {...settings}>
              {items.map((item, index) => (
                <Link to={`/product/${item.itemID}`} key={index} className='w-full h-full px-2'> {/* Add horizontal padding for spacing */}
                  <div className='w-full h-full p-5 rounded-tr-[50px] rounded-bl-[50px] shadow-sm hover:shadow-lg bg-white mb-5'>
                    {/* Image */}
                    <div className="w-full h-[200px] mb-4 rounded-tr-[50px] rounded-bl-[50px]">
                      <img
                        src={`https://admincwk.worldpos.biz/Uploads/${item.itemID}.png`}
                        alt={item.itemName}
                        className="w-full h-full object-cover rounded-tr-[45px] rounded-bl-[45px]"
                      />
                    </div>
                    {/* Item Info */}
                    <p className='text-lg font-semibold font-karla'>{item.itemName}</p>
                    <p className='mt-1 text-lg font-bold text-green font-karla'>Rs. {item.retailPrice}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Prevents navigation
                        e.stopPropagation(); // Stops event bubbling to the Link
                        handleAddToCart(item);
                      }}
                      className='mt-4 w-full py-2 rounded-tr-[45px] rounded-bl-[45px] font-poppins bg-amber/80 hover:bg-amber text-white rounded-md'>
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
