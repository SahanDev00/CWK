import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const NewProducts = () => {

    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const [items, setItems] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;
                const apiUrl = process.env.REACT_APP_API_URL;
                const response = await axios.get(`${apiUrl}/CategoryMain`, {
                    headers: {
                        'APIKey' : apiKey
                    }
                });
                setCategories(response.data.data);
            } catch (err) {
                console.log('Error fetching categories', err)
            }
        }
        fetchCategories();
    }, []);

    const fetchItems = async (CategoryID) => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/Item?CategoryMainID=${CategoryID}&IsNew=y`, {
                headers: {
                    'APIKey' : apiKey
                }
            });
            setItems(response.data.data);
        } catch (err) {
            console.log('Error fetching categories', err)
        }
    }

    const fetchNewItems = async () => {
        try {
            const apiKey = process.env.REACT_APP_API_KEY;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/Item?IsNew=y`, {
                headers: {
                    'APIKey' : apiKey
                }
            });
            setItems(response.data.data);
        } catch (err) {
            console.log('Error fetching categories', err)
        }
    }

    useEffect(() => {
        fetchNewItems();
    }, [])

    
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
    <div className='w-full min-h-screen pt-28'>
        <img src="https://wellingtoncitymission.org.nz/wp-content/uploads/2021/03/Social-supermarket-WB-Banner-EDIT.png" className='w-full h-[250px] object-cover' alt="" />
        <div className='flex w-[90%] mx-auto mt-10'>

            {/* Side bar */}
            <div className='w-[400px] h-[500px] p-4'>
                <h1 className='text-lg font-overpass'>Shop by <span className='font-bold'>Category</span></h1>
                <hr className='opacity-50 mt-2' />
                <div className='w-full h-full overflow-y-auto mt-5'>
                    {categories.map((category) => (
                        <div id={category.categoryMainID} className='w-full flex items-center justify-between cursor-pointer' onClick={() => {fetchItems(category.categoryMainID); setActiveCategory(category.categoryMainID);}}>
                            <p className={`font-karla mb-1 ${activeCategory === category.categoryMainID ? 'text-amber' : 'text-black/70 hover:text-black/90'}`}>{category.categoryMainName}</p>
                            <IoMdArrowDropright className={`${activeCategory === category.categoryMainID ? 'text-amber' : 'text-black/70 hover:text-black/90'}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Items */}
            <div className='w-full grid grid-cols-4 ml-5 gap-5'>
                {items.length > 0 ? 
                    items.map((item) => (
                        <Link to={`/product/${item.itemID}`} className='w-full h-[400px] p-3 flex flex-col shadow-sm hover:shadow-lg duration-200 rounded-tr-[40px] rounded-bl-[40px]'>
                            <div className='w-full h-[400px] overflow-hidden'> 
                                <img src={`https://admincwk.worldpos.biz/Uploads/${item.itemID}.png`} className='w-full h-full object-cover rounded-tr-[40px] rounded-bl-[40px]' alt="" />
                            </div>
                            <div className='w-full h-[220px] flex flex-col items-center justify-center'>
                                <p className='text-lg font-semibold font-karla'>{item.itemName}</p>
                                <p className='text-green font-poppins'>Rs. {item.retailPrice}</p>
                                <button
                                    onClick={(e) => {
                                    e.preventDefault(); // Prevents navigation
                                    e.stopPropagation(); // Stops event bubbling to the Link
                                    handleAddToCart(item);
                                    }}
                                    className='w-[90%] font-roboto mx-auto rounded-tr-3xl rounded-bl-3xl my-2 py-1 shadow hover:bg-yellow hover:text-white hover:shadow-lg duration-200'>Add to cart</button>
                            </div>
                        </Link>
                    )) : (
                        <p className='text-center font-karla'>No New Items Available...</p>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default NewProducts