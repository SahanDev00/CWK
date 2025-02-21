import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoIosClose } from "react-icons/io";

const MyOrderView = ({ viewOrder, onClose }) => {

    const [orderItem, setOrderItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const apiKey = process.env.REACT_APP_API_KEY;
            try {
                const response = await axios.get(`https://admincwk.worldpos.biz/Api/OrderItem?OrderID=${viewOrder.orderID}`, {
                    headers: {
                        'APIKey': apiKey
                    }
                });

                if (response.status === 200 && response.data.success) {
                    // Since the response contains an array inside "data", we extract the first item
                    setOrderItem(response.data.data[0]);
                } else {
                    setError('Failed to fetch order details');
                }
            } catch (err) {
                console.error('Error fetching order details:', err);
                setError('An error occurred while fetching order details');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [viewOrder.orderID]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[70%] bg-white p-5 relative">
          <h1 className="text-2xl text-center my-8 font-bold text-black/70 font-poppins">Loading Order Details...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="w-[70%] bg-white p-5 relative">
          <h1 className="text-2xl text-center my-8 font-bold text-red-500 font-poppins">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className='w-[90%] md:w-[70%] bg-white p-5 relative'>
            <h1 className='text-2xl text-center my-8 font-bold text-black/70 font-poppins'>Order Details : {viewOrder.orderID}</h1>
            <IoIosClose className='absolute top-2 right-2 size-10 cursor-pointer' onClick={onClose}/>
            <div className='overflow-x-auto container mx-auto'>
                <table className='min-w-full bg-yellow/50 text-black/60 border border-gray'>
                    <thead>
                        <tr>
                        <th className='px-4 py-2 border-b border-gray text-left font-poppins'>Product</th>
                        <th className='px-4 py-2 border-b border-gray text-center font-poppins'>Quantity</th>
                        <th className='px-4 py-2 border-b border-gray text-center font-poppins'>Price</th>
                        <th className='px-4 py-2 border-b border-gray text-center font-poppins'>Discount</th>
                        <th className='px-4 py-2 border-b border-gray text-center font-poppins'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {/* Check if orderItem is defined */}
                    {orderItem ? (
                        <tr key={orderItem.orderItemID}>
                            <td className='px-4 py-2 border-b border-gray'>
                            <img className='w-[60px] inline-block mr-5' src={`http://admincwk.worldpos.biz/Uploads/${orderItem.itemID}.png`} alt={orderItem.itemName} />
                            {orderItem.itemName}
                            </td>
                            <td className='px-4 py-2 border-b border-gray text-center'>{orderItem.itemQty}</td>
                            <td className='px-4 py-2 border-b border-gray text-center'>Rs. {orderItem.itemPriceDisplay}</td>
                            <td className='px-4 py-2 border-b border-gray text-center'>{orderItem.itemDiscountDisplay}</td>
                            <td className='px-4 py-2 border-b border-gray text-center'>Rs. {orderItem.lineTotalDisplay}</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center px-4 py-2 text-red">No order items available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default MyOrderView;
