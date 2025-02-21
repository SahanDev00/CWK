import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useCart } from '../Cart/CartContext';
import { toast } from 'react-toastify';

const ProductDescription = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState(null); // Changed from [] to null
  const [mainImage, setMainImage] = useState(""); // State for main image
  const [images, setImages] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/Item/${itemID}`, {
          headers: { APIKey: apiKey },
        });
        setItem(response.data.data);
      } catch (err) {
        console.log("Error fetching product data", err);
      }
    };
    fetchItems();
  }, [itemID]);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(
          `https://admincwk.worldpos.biz/Api/ImageData/${itemID}`,
          { headers: { APIKey: apiKey } }
        );
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setImages(data.data);
          setMainImage(
            `https://admincwk.worldpos.biz/Uploads/${data.data[0].imageID}.png`
          );
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchImageData();
  }, [itemID]);

  
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

  if (!item) {
    return <div className="text-center text-gray h-screen pt-40">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-56 min-h-[80vh]">
      {/* Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Main Image */}
        <div>
          <img
            src={mainImage || "https://via.placeholder.com/500"}
            alt="Product"
            className="w-full h-auto rounded-tr-3xl rounded-bl-3xl border-yellow/70 border-4"
          />
          {/* Sub Images */}
          <div className="flex gap-2 mt-4">
            {images.map((image) => (
              <img
                key={image.imageID}
                src={`https://admincwk.worldpos.biz/Uploads/${image.imageID}.png`}
                alt="Sub"
                className="w-20 h-20 border-yellow/70 border-4 object-cover rounded-md cursor-pointer  rounded-tr-3xl rounded-bl-3xl"
                onClick={() =>
                  setMainImage(
                    `https://admincwk.worldpos.biz/Uploads/${image.imageID}.png`
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold font-karla text-amber600">{item.itemName}</h1>
          <p className="text-gray font-poppins">{item.itemDescription}</p>
          <p className="text-2xl font-semibold text-green/80 font-karla">
            Rs. {item.retailPrice}
          </p>
          {/* Stock Availability */}
          <p
            className={`font-roboto ${
              item.stockAvailable === 'A' ? "text-green" : "text-red"
            }`}
          >
            {item.stockAvailable === 'A' ? "In Stock" : "Out of Stock"}
          </p>
          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevents navigation
              e.stopPropagation(); // Stops event bubbling to the Link
              handleAddToCart(item);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-yellow/80 text-black hover:text-white font-medium rounded-tr-2xl rounded-bl-2xl shadow-md hover:bg-yellow transition">
            <FaShoppingCart />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
