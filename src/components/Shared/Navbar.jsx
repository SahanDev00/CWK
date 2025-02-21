import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleRight, FaCartArrowDown, FaPhoneAlt, FaUser } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoIosClose } from 'react-icons/io'
import { RiLoginBoxFill } from 'react-icons/ri'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { useCart } from '../Cart/CartContext';
import { IoClose, IoMenu } from 'react-icons/io5'

const Navbar = () => {

    const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [activeCategoryID, setActiveCategoryID] = useState(null); // Track the active category ID
    const [searchQuery, setSearchQuery] = useState('');
    const Navigate = useNavigate()
    const location = useLocation();
    const { getTotalItems, calculateTotal } = useCart();
    const [openCategory, setOpenCategory] = useState(null);
    const [navbar, setNavbar] = useState(false);

    const toggleNavbar = () => {
        setNavbar(!navbar);
    };

    const toggleCategory = (categoryID) => {
        if (openCategory === categoryID) {
            setOpenCategory(null); // Close if already open
        } else {
            setOpenCategory(categoryID);
            fetchSubCategories(categoryID);
        }
    };

    const isActive = (path) => {
        return location.pathname === path;
      };

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
            <div className='w-[90%] lg:w-[80%] mx-auto flex h-full'>
                <div className='hidden md:block md:w-[50%] lg:w-full '/>
                <div className='w-full h-full flex gap-2 sm:gap-5 items-center text-white justify-end'>
                    <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                        <FaLocationDot className='text-lg group-hover:text-yellow'/>
                        <p className='text-[12px] md:text-sm group-hover:text-yellow font-poppins'>Store Location | </p>
                    </div>
                    <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                        <FaPhoneAlt className='md:text-lg group-hover:text-yellow'/>
                        <p className='text-[12px] md:text-sm group-hover:text-yellow font-poppins'>+94 71 265 2654 | </p>
                    </div>
                    {!customerId ? (
                        <Link to='/sign-up'>
                            <div className='flex gap-1 items-center h-full justify-center group cursor-pointer'>
                                <RiLoginBoxFill className={`md:text-lg group-hover:text-yellow ${isActive('/sign-up') && 'text-yellow' }`}/>
                                <p className={`text-[12px] md:text-sm group-hover:text-yellow font-poppins ${isActive('/sign-up') && 'text-yellow' }`}>Sign Up | Sign In</p>
                            </div>
                        </Link>
                    ) : (
                        <Link to='/my-profile'>
                            <div className='flex gap-2 items-center h-full justify-center group cursor-pointer'>
                                <FaUser className={`md:text-lg group-hover:text-yellow ${isActive('/my-profile') && 'text-yellow' }`}/>
                                <p className={`text-[12px] hidden sm:block md:text-sm group-hover:text-yellow font-poppins ${isActive('/my-profile') && 'text-yellow' }`}>My Profile</p>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
            <div className='w-[90%] lg:w-[80%] mx-auto flex justify-between items-center pt-1 h-[60px]'>
                <div className='w-[100px] lg:w-[150px] h-full flex items-center'>
                    <p className='text-3xl md:text-4xl lg:text-5xl w-[130px] text-center text-white font-bold font-karla'>CWK</p>
                </div>
                <div className='sm:flex w-full h-full items-center justify-center gap-4 text-white font-karla text-sm md:text-[15px] hidden'>
                    <Link to='/'>
                        <p className={`hover:font-medium cursor-pointer ${isActive('/') && ' border-b scale-105'}`}>Home</p>
                    </Link>
                    <Link to='/all-products'>
                        <p className={`hover:font-medium cursor-pointer ${isActive('/all-products') && ' border-b scale-105'}`}>All Products</p>
                    </Link>
                    <Link to='/new-products'>
                        <p className={`hover:font-medium cursor-pointer ${isActive('/new-products') && ' border-b scale-105'}`}>New Products</p>
                    </Link>
                    <Link to='/promotions'>
                        <p className={`hover:font-medium cursor-pointer ${isActive('/promotions') && ' border-b scale-105'}`}>Promotions</p>
                    </Link>
                </div>
                <div className='flex sm:w-[30%] md:w-[50%] lg:w-full h-full items-center justify-end gap-4 sm:gap-6'>
                    <Link to='/cart' className='flex gap-2 justify-center items-center h-full relative'>
                        <FaCartArrowDown className='text-white text-lg'/>
                        {getTotalItems() > 0 && (
                            <p className='absolute top-2 -right-3 bg-green rounded-full px-1 text-white text-sm'>{getTotalItems()}</p>
                        )}
                    </Link>
                    <div className='flex gap-2 justify-center items-center h-full'>
                        <p className='text-white font-semibold'>Rs. {calculateTotal()}</p>
                    </div>
                    {navbar ? 
                        <IoClose onClick={toggleNavbar} className='size-6 sm:hidden duration-300 hover:text-amber cursor-pointer' />
                            :
                        <IoMenu onClick={toggleNavbar} className='text-white size-6 sm:hidden duration-300 hover:text-amber cursor-pointer' />
                    }
                </div>
            </div>
            <div className='w-[90%] md:w-[80%] mx-auto h-[40px] lg:h-[50px] rounded-tr-3xl rounded-bl-3xl border border-gray/50 bg-white flex sm:relative'>
                <div className='w-[200px] md:w-[300px] border-r flex justify-center text-[13px] md:text-[16px] items-center gap-3 cursor-pointer font-karla hover:bg-gray/10 rounded-bl-2xl' onClick={() => {isCategoriesOpen ? setIsCategoriesOpen(false) : setIsCategoriesOpen(true)}}>
                    <p>Categories</p>
                    <FaAngleDown />
                </div>
                <div className='w-full rounded-tr-3xl flex'>
                    <input type="text" className='w-full h-full focus:outline-none pl-5'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Handle Enter key press
                     />

                    <button className='w-[100px] md:w-[200px] h-full bg-amber rounded-tr-3xl rounded-bl-3xl text-[13px] md:text-[16px] font-medium text-white' onClick={handleSearch}>Search</button>
                </div>
                {isCategoriesOpen && (
                    <div className='w-[95%] xl:w-[90%] 2xl:w-[80%] hidden sm:block absolute mt-[55px] border bg-white border-gray/50 left-0 right-0 rounded-tr-3xl rounded-bl-3xl shadow-2xl p-4 min-h-[300px] max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray/80 scrollbar-track-gray/0'>
                        {categories.map((category) => (
                            <div key={category.categoryMainID} className='w-full text-black/80 flex'>
                                <div className='w-[150px] sm:w-[220px] md:w-[250px] lg:w-[300px] 2xl:w-[400px] h-full'>
                                    <div className={`flex justify-between w-full h-full items-center cursor-pointer ${activeCategoryID === category.categoryMainID ? 'bg-yellow/70' : 'hover:bg-gray/10'}`} onClick={() => fetchSubCategories(category.categoryMainID)}>
                                        <p className='font-karla pb-3 pt-2 text-[12px] sm:text-sm pl-2'>{category.categoryMainName}</p>
                                        <FaAngleRight className='text-black/80 pr-2' />
                                    </div>
                                    <hr />
                                </div>

                                {/* Subcategories appear above the main category grid */}
                                {category.categoryMainID === activeCategoryID && (
                                    <div className="pt-3 absolute top-0 sm:ml-[260px] md:ml-[320px] lg:ml-[380px] xl:ml-[420px] 2xl:ml-[450px]"> {/* Adds a little top padding */}
                                        <h1 className="font-karla text-lg mb-3 font-medium">All {category.categoryMainName}</h1>
                                        {subCategories.map((subCategory) => (
                                            <div key={subCategory.categorySubID} className='w-full'>
                                                <div className='flex justify-between w-full items-center cursor-pointer hover:bg-gray/10'>
                                                    {subCategory.categorySubName ? (
                                                        <Link to={`/products/${subCategory.categorySubID}`} onClick={() => setIsCategoriesOpen(false)}>
                                                            <p className='font-karla pb-3 pt-2 text-sm pl-2 w-[240px] lg:w-[300px] 2xl:w-[400px]'>{subCategory.categorySubName}</p>
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

        {/* Small cats */}
        {isCategoriesOpen && (
            <div className='absolute sm:hidden bg-white w-full h-screen z-50 overflow-y-auto'>
                <div className='flex w-[90%] mx-auto justify-between items-center'>
                    <h1 className='my-4 text-amber600 text-xl font-roboto'>Select a category</h1>
                    <IoIosClose className='text-4xl text-amber600' onClick={() => setIsCategoriesOpen(false)} />
                </div>
                <hr className='opacity-20' />
                {categories.map((category) => (
                    <div key={category.categoryMainID} className='w-full text-black/80'>

                        {/* Main Category */}
                        <div
                            className={`w-full flex items-center justify-between cursor-pointer px-4 py-3 border-b ${openCategory === category.categoryMainID ? 'bg-yellow/70' : 'hover:bg-gray/10'}`}
                            onClick={() => toggleCategory(category.categoryMainID)}
                        >
                            <p className='font-karla text-sm sm:text-base'>{category.categoryMainName}</p>
                            {openCategory === category.categoryMainID ? (
                                <FaAngleDown className='text-black/80' />
                            ) : (
                                <FaAngleRight className='text-black/80' />
                            )}
                        </div>

                        {/* Subcategories - Only for Mobile (Under `sm`) */}
                        <div className={`sm:hidden ${openCategory === category.categoryMainID ? 'block' : 'hidden'}`}>
                            {subCategories.map((subCategory) => (
                                <div key={subCategory.categorySubID} className='pl-6 py-2 border-b'>
                                    {subCategory.categorySubName ? (
                                        <Link to={`/products/${subCategory.categorySubID}`} onClick={() => setIsCategoriesOpen(false)}>
                                            <p className='font-karla text-sm text-gray'>{subCategory.categorySubName}</p>
                                        </Link>
                                    ) : (
                                        <p className='font-karla text-sm text-black/70'>No Items Available</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        )}

        {/* Small navbar */}
        {navbar && (
            <div className='w-screen overflow-hidden h-screen bg-white z-50 fixed items-center justify-center gap-4 text-black flex flex-col font-karla text-sm md:text-[15px] sm:hidden'>
                <Link to='/'>
                    <p className={`hover:font-medium cursor-pointer ${isActive('/') && ' border-b scale-105'}`} onClick={() => setNavbar(false)}>Home</p>
                </Link>
                <Link to='/all-products'>
                    <p className={`hover:font-medium cursor-pointer ${isActive('/all-products') && ' border-b scale-105'}`} onClick={() => setNavbar(false)}>All Products</p>
                </Link>
                <Link to='/new-products'>
                    <p className={`hover:font-medium cursor-pointer ${isActive('/new-products') && ' border-b scale-105'}`} onClick={() => setNavbar(false)}>New Products</p>
                </Link>
                <Link to='/promotions'>
                    <p className={`hover:font-medium cursor-pointer ${isActive('/promotions') && ' border-b scale-105'}`} onClick={() => setNavbar(false)}>Promotions</p>
                </Link>
                <IoIosClose className='text-4xl absolute top-5 right-5' onClick={() => setNavbar(false)} />
            </div>
        )}
    </div>
  )
}

export default Navbar