import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MyOrderView from './MyOrderView';

const MyOrders = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
  const [viewOrder, setViewOrder] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch order data from API
    const fetchOrders = async () => {
      const api = `https://admincwk.worldpos.biz/Api/Order?CustomerID=${customerId}`;
      
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(api,  {
          method: 'GET',
          headers: {
            'APIKey': apiKey,
          },});
        const result = await response.json();
        
        if (response.ok && result.success) {
          setOrders(result.data);
        } else {
          console.error('Error fetching orders:', result.errorMessage);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, [customerId]);

  if (orders.length === 0) {
    return <div className='bg-white h-[85vh] w-full mx-auto pt-40'>
      <h1 className='font-semibold mt-5 text-center'>You Don't Have Orders Yet!!!</h1>
    </div>
  }

  return (
    <div className='w-full md:min-h-[700px] lg:min-h-[650px] xl:min-h-[700px] 2xl:min-h-[800px] mx-auto px-4 py-8 mb-5 pt-24 bg-white'>
      <h1 className='text-2xl font-bold mb-5 text-black/70 font-poppins text-center pt-5'>Track My Orders</h1>
      <div className='overflow-x-auto w-[95%] md:w-[90%] mx-auto'>
        <table className='min-w-full text-black/60 border border-black/60'>
          <thead>
            <tr>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Order ID</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Address</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Date</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Total</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Status</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Paid Status</th>
              <th className='px-4 text-left py-2 border-b border-black/60 font-poppins'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId}>
                <td className='px-4 py-2 border-b border-black/60 font-poppins'>{order.orderID}</td>
                <td className='px-4 py-2 border-b border-black/60 font-poppins'>{order.addressDisplay}</td>
                <td className='px-4 py-2 border-b border-black/60 font-poppins'>{order.orderDateDisplay}</td>
                <td className='px-4 py-2 border-b border-black/60 font-poppins'>Rs. {order.itemTotalDisplay}</td>
                <td className={`px-4 py-2 border-b border-black/60 font-poppins ${order.orderStatusClass === 'success' ? 'text-fourth' : 'text-red'}`}>
                {order.orderStatusText}
                </td>
                <td className={`px-4 font-poppins py-2 border-b border-black/60 ${order.paidStatusClass === 'success' ? 'text-fourth' : 'text-red'}`}>
                {order.paidStatusText}
                </td>
                <td className='px-4 font-poppins py-2 border-b border-black/60'>
                    <button onClick={() => {setIsOrderOpen(true); setViewOrder(order);}} className='bg-yellow font-poppins text-white px-4 py-2 rounded hover:bg-yellow'>
                        View
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOrderOpen && (
        <MyOrderView viewOrder={viewOrder} onClose={() => setIsOrderOpen(false)} />
      )}
    </div>
  );
};

export default MyOrders;