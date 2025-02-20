import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleRight, FaCartArrowDown, FaPhoneAlt } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { RiLoginBoxFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState(null); // Track the active category ID
    const [searchQuery, setSearchQuery] = useState('');
    const Navigate = useNavigate()

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

    const fetchSubCategories = async (categoryMainID) => {
        try {
            setActiveCategoryID(categoryMainID); // Update active category
            setSubCategories([]); // Clear subcategories when selecting a new main category

            const apiKey = process.env.REACT_APP_API_KEY;
            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await axios.get(`${apiUrl}/CategorySub?CategoryMainID=${categoryMainID}`, {
                headers: {
                    'APIKey' : apiKey
                }
            });
            setSubCategories(response.data.data);
        } catch (err) {
            console.log('Error fetching categories', err)
        }
    }

    const handleSearch = () => {
        if (searchQuery.trim()) {
            Navigate(`/products/Search/${searchQuery.trim()}`);
            setSearchQuery('')
        }
    };

  return (
    <div className='w-full bg-yellow h-[130px] fixed z-50'>
        <div className='w-full h-[40px] bg-black'>
            <div className='w-[80%] mx-auto grid grid-cols-2 h-full'>
                <div className='w-full'/>
                <div className='w-full h-full flex gap-5 items-center text-white justify-end'>
                    <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                        <FaLocationDot className='text-lg group-hover:text-yellow'/>
                        <p className='text-sm group-hover:text-yellow font-poppins'>Store Location | </p>
                    </div>
                    <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                        <FaPhoneAlt className='text-lg group-hover:text-yellow'/>
                        <p className='text-sm group-hover:text-yellow font-poppins'>+94 71 265 2654 | </p>
                    </div>
                    <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                        <RiLoginBoxFill className='text-lg group-hover:text-yellow'/>
                        <p className='text-sm group-hover:text-yellow font-poppins'>Sign Up | Sign In</p>
                    </div>
                </div>
            </div>
            <div className='w-[80%] mx-auto flex justify-between items-center pt-1 h-[60px]'>
                <div className='w-[150px] h-full'>
                    <p className='text-5xl w-[130px] text-center text-white font-bold font-karla'>CWK</p>
                </div>
                <div className='flex w-full h-full items-center justify-center gap-4 text-white font-karla'>
                    <Link to='/'>
                        <p className='hover:font-medium cursor-pointer'>Home</p>
                    </Link>
                    <Link to='/all-products'>
                        <p className='hover:font-medium cursor-pointer'>All Products</p>
                    </Link>
                    <Link to='/new-products'>
                        <p className='hover:font-medium cursor-pointer'>New Products</p>
                    </Link>
                    <Link to='/promotions'>
                        <p className='hover:font-medium cursor-pointer'>Promotions</p>
                    </Link>
                </div>
                <div className='flex w-full h-full items-center justify-end gap-6'>
                    <div className='flex gap-2 justify-center items-center h-full relative'>
                        <FaCartArrowDown className='text-white text-lg'/>
                        <p className='absolute top-2 -right-3 bg-green rounded-full px-1 text-white text-sm'>0</p>
                    </div>
                    <div className='flex gap-2 justify-center items-center h-full'>
                        <p className='text-white font-semibold'>Rs. 0.00</p>
                    </div>
                </div>
            </div>
            <div className='w-[80%] mx-auto h-[50px] rounded-tr-3xl rounded-bl-3xl border border-gray/50 bg-white flex relative'>
                <div className='w-[300px] border-r flex justify-center items-center gap-3 cursor-pointer font-karla hover:bg-gray/10 rounded-bl-2xl' onClick={() => {isCategoriesOpen ? setIsCategoriesOpen(false) : setIsCategoriesOpen(true)}}>
                    <p>Categories</p>
                    <FaAngleDown />
                </div>
                <div className='w-full rounded-tr-3xl flex'>
                    <input type="text" className='w-full h-full focus:outline-none pl-5'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle Enter key press
                     />

                    <button className='w-[200px] h-full bg-amber rounded-tr-3xl rounded-bl-3xl font-medium text-white' onClick={handleSearch}>Search</button>
                </div>
                {isCategoriesOpen && (
                    <div className='w-[80%] absolute mt-[55px] border bg-white border-gray/50 left-0 right-0 rounded-tr-3xl rounded-bl-3xl shadow-2xl p-4 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray/80 scrollbar-track-gray/0'>
                        {categories.map((category) => (
                            <div key={category.categoryMainID} className='w-full text-black/80 flex'>
                                <div className='w-[400px] h-full'>
                                    <div className={`flex justify-between w-full h-full items-center cursor-pointer  ${activeCategoryID === category.categoryMainID ? 'bg-yellow/70' : 'hover:bg-gray/10'}`} onClick={() => fetchSubCategories(category.categoryMainID)}>
                                        <p className='font-karla pb-3 pt-2 text-sm pl-2'>{category.categoryMainName}</p>
                                        <FaAngleRight className='text-black/80 pr-2' />
                                    </div>
                                    <hr />
                                </div>

                                {/* Subcategories appear above the main category grid */}
                                {category.categoryMainID === activeCategoryID && (
                                    <div className="pt-3 absolute top-0 ml-[450px]"> {/* Adds a little top padding */}
                                        <h1 className="font-karla text-lg mb-3 font-medium">All {category.categoryMainName}</h1>
                                        {subCategories.map((subCategory) => (
                                            <div key={subCategory.categorySubID} className='w-full'>
                                                <div className='flex justify-between w-full items-center cursor-pointer hover:bg-gray/10'>
                                                    {subCategory.categorySubName ? (
                                                        <Link to={`/products/${subCategory.categorySubID}`} onClick={() => setIsCategoriesOpen(false)}>
                                                            <p className='font-karla pb-3 pt-2 text-sm pl-2 w-[400px]'>{subCategory.categorySubName}</p>
                                                        </Link>
                                                    ) : (
                                                        <p className='font-karla pb-3 pt-2 text-sm pl-2 w-[400px]'>No Items Available</p>
                                                    )}
                                                </div>
                                                <hr />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
        </div>
        </div>
    </div>
  )
}

export default Navbar