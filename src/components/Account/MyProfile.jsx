import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog';

const MyProfile = () => {
  const [users, setUsers] = useState([]);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [editUser, setEditUser] = useState({});
  const Navigate = useNavigate();
  const customerID = sessionStorage.getItem('customerId') || Cookies.get('customerId');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerData = {
      customerID: customerID,
      loginEmail: editUser.loginEmail,
      salutation: editUser.salutation,
      firstName: editUser.firstName,
      middleName: editUser.middleName,
      lastName: editUser.lastName,
      addressLine1: editUser.addressLine1,
      addressLine2: editUser.addressLine2,
      city: editUser.city,
      postalCode: editUser.postalCode,
      country: editUser.country,
      telephoneMobile: editUser.telephoneMobile,
      loginPassword: editUser.loginPassword,
      confirmPassword: editUser.confirmPassword || editUser.loginPassword,
    };

    try {
      console.log('Submitting data:', customerData);
      const response = await axios.put('https://admincwk.worldpos.biz/api/Customer', customerData, {
        headers: {
          'Content-Type': 'application/json',
          'APIKey': process.env.REACT_APP_API_KEY,
        },
      });
      if (response.data.success) {
        toast.success('Profile updated successfuly!', {
          position: "top-right",
          autoClose: 2000, // Automatically close after 3 seconds
        });
        window.location.reload();
      } else {
        toast.error('Error updating profile!', {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile!', {
        position: "top-right",
      });
      
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const result = await axios.get(`https://admincwk.worldpos.biz/api/Customer/${customerID}`, {
          headers: { 'APIKey': apiKey }
        });

        setUsers(result.data.data);
        setEditUser(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [customerID]);

  const handleLogout = () => {
    sessionStorage.clear();
    Cookies.remove('customerId');
    Cookies.remove('firstName');
    Cookies.remove('lastName');
    Cookies.remove('email');

    toast.success('Successfully logged out!', { position: "top-right", autoClose: 2000 });
    setTimeout(() => Navigate('/'), 2000);
  };

  return ( 
    <div className='w-full min-h-[90vh] pt-40 bg-white'>
      <div className='w-[80%] mx-auto pt-5'>
        <h1 className='py-2 text-2xl uppercase font-roboto'>{users.firstName}'s Account</h1>

        {/* USER INFO */}
        <div className='bg-yellow/20 p-5 md:w-[400px] shadow font-karla mb-5 relative'>
          <FaRegEdit 
            className='absolute right-2 top-2 cursor-pointer' 
            onClick={() => setOpenUserModal(true)} 
          />
          <p className='text-lg uppercase pb-2 font-poppins'>{users.firstName}'s Information</p>
          {users.salutation === 'adfasgfdsgfsegwewszdfzfzfzgfef' && (
            <div>
              <p className='hidden'>{users.salutation}'s Information</p>
              <p className='hidden'>{users.middleName}</p>
              <p className='hidden'>{users.lastName}</p>
              <p className='hidden'>{users.loginPassword}</p>
              <p className='hidden'>{users.confirmPassword}</p>
              <p className='hidden'>{users.postalCode}</p>
            </div>
          )} 
          <p className='pl-3'><span className='font-medium'>Name:</span> {users.customerDisplay}</p>
          <p className='pl-3'><span className='font-medium'>Email:</span> {users.loginEmail}</p>
          <p className='pl-3'><span className='font-medium'>Mobile Number:</span> {users.telephoneMobile}</p>
          <p className='pl-3'><span className='font-medium'>Password:</span> **********</p>
        </div>

        {/* SHIPPING INFO */}
        <div className='bg-yellow/20 p-5 md:w-[500px] shadow font-karla mb-5 relative'>
          <p className='text-lg uppercase pb-2 font-poppins'>Shipping Information</p>
          <p className='pl-3'><span className='font-medium'>Address Line 1:</span> {users.addressLine1}</p>
          <p className='pl-3'><span className='font-medium'>Address Line 2:</span> {users.addressLine2}</p>
          <p className='pl-3'><span className='font-medium'>City:</span> {users.city}</p>
          <p className='pl-3'><span className='font-medium'>Country:</span> {users.country}</p>
        </div>

        <Link to='/my-orders'>
          <button className='px-5 py-2 border hover:border-amber hover:bg-yellow/20 duration-100 mb-10 md:mb-0'>My Orders</button>
        </Link>
        <button 
          onClick={handleLogout} 
          className='px-5 py-2 border border-red text-red hover:border-amber hover:bg-red hover:text-white duration-100 mb-10 md:mb-0 ml-3'>
          Log Out
        </button>

        {/* USER INFO MODAL */}
        <Dialog.Root open={openUserModal} onOpenChange={setOpenUserModal}>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 shadow-sm z-50" />
          <Dialog.Content className="fixed max-h-[95vh] overflow-y-auto z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md w-full max-w-[90%] md:max-w-[70%] lg:max-w-[50%]">
            <Dialog.Title className="text-xl font-bold">Edit User Information</Dialog.Title>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {/* Left Side - User Info */}
              <div className="w-full">
                <label className="block font-medium">Salutation</label>
                <input 
                  type="text" 
                  name='salutation'
                  value={editUser.salutation} 
                  onChange={(e) => setEditUser({ ...editUser, salutation: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">First Name</label>
                <input 
                  type="text" 
                  name='firstName'
                  value={editUser.firstName} 
                  onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Middle Name</label>
                <input 
                  type="text" 
                  name='middleName'
                  value={editUser.middleName} 
                  onChange={(e) => setEditUser({ ...editUser, middleName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Last Name</label>
                <input 
                  type="text" 
                  name='lastName'
                  value={editUser.lastName} 
                  onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Email</label>
                <input 
                  type="email" 
                  name='email'
                  value={editUser.loginEmail} 
                  onChange={(e) => setEditUser({ ...editUser, loginEmail: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Mobile Number</label>
                <input 
                  type="text" 
                  name='mobile'
                  value={editUser.telephoneMobile} 
                  onChange={(e) => setEditUser({ ...editUser, telephoneMobile: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Password</label>
                <input 
                  type="password" 
                  name='password'
                  value={editUser.loginPassword} 
                  onChange={(e) => setEditUser({ ...editUser, loginPassword: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <label className="block mt-2 font-medium">Confirm Password</label>
                <input 
                  type="password" 
                  name='confirmPassword'
                  value={editUser.confirmPassword  || ''}
                  onChange={(e) => setEditUser({ ...editUser, confirmPassword: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  />
                  {editUser.confirmPassword && editUser.confirmPassword !== editUser.loginPassword && (
                    <p className='text-sm text-red'>Password Does not match</p>
                  )}
              </div>

              {/* Right Side - Shipping Info */}
              <div className="w-full">
                <h2 className="text-lg font-bold">Shipping Information</h2>

                <label className="block mt-2 font-medium">Address Line 1</label>
                <input 
                  type="text" 
                  name='addressLine1'
                  value={editUser.addressLine1} 
                  onChange={(e) => setEditUser({ ...editUser, addressLine1: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Address Line 2</label>
                <input 
                  type="text" 
                  name='addressLine2'
                  value={editUser.addressLine2} 
                  onChange={(e) => setEditUser({ ...editUser, addressLine2: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">City</label>
                <input 
                  type="text" 
                  name='city'
                  value={editUser.city} 
                  onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Postal Code</label>
                <input 
                  type="text" 
                  name='postalCode'
                  value={editUser.postalCode} 
                  onChange={(e) => setEditUser({ ...editUser, postalCode: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />

                <label className="block mt-2 font-medium">Country</label>
                <input 
                  type="text" 
                  name='country'
                  value={editUser.country} 
                  onChange={(e) => setEditUser({ ...editUser, country: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-4">
              <button onClick={handleSubmit} className="px-4 py-2 bg-amber text-white rounded-md hover:bg-yellow transition">
                Save Changes
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      </div>
    </div>
  );
};

export default MyProfile;
