import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SignUp = ({onLogin}) => {

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate()
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    salutation: 'Mr.',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    mobile: '',
    confirmPassword: '',
    oldPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await axios.get('https://admincwk.worldpos.biz/Api/Country', {
          headers: { 'APIKey': apiKey },
        });

        console.log("API Response:", response.data); // Debugging the response

        if (response.data && response.data.data) {
          setCountries(response.data.data); // Corrected response parsing
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("API Fetch Error:", error.response ? error.response.data : error.message);
      }
    };

    fetchCountries();
  }, []);
  


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiURL = `https://admincwk.worldpos.biz/api/customer`; 

    let dataToSubmit = {
      customerID: "", 
      loginEmail: formData.email,
      loginPassword: formData.password,
      salutation: formData.salutation,
      firstName: formData.firstName,
      lastName: formData.lastName,
      addressLine1: formData.addressLine1,
      addressLine2: formData.addressLine2 || "", // Optional address line 2
      city: formData.city,
      postalCode: formData.postalCode || "", // Optional postal code
      country: formData.country, // Default country if not provided
      telephoneMobile: formData.mobile,
      confirmPassword: formData.confirmPassword,
      oldPassword: formData.confirmPassword || ""
    };
      
      try {
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(apiURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'APIKey': apiKey,
          },
          body: JSON.stringify(dataToSubmit),
        });
      
        const result = await response.json();

        if(!result.success) {
            toast.error('Validation error!', {
              position: "top-right",
            });
        }
      
        if (response.ok) {
          if (result.success) {
              const customerID = result.data.customerID; // Access customerID from the data object

              // Set cookies if Remember Me is checked
              if (rememberMe) {
              sessionStorage.setItem('customerId', customerID);
              Cookies.set('customerId', customerID, { expires: 30 });
              Cookies.set('firstName', result.data.firstName, { expires: 30 });
              Cookies.set('lastName', result.data.lastName, { expires: 30 });
              Cookies.set('email', result.data.loginEmail, { expires: 30 });
              } else {
              // Store data in session
              sessionStorage.setItem('customerId', customerID);
              sessionStorage.setItem('firstName', result.data.firstName);
              sessionStorage.setItem('lastName', result.data.lastName);
              sessionStorage.setItem('email', result.data.loginEmail);
            }
                
              toast.success('Successfully logged in!', {
                position: "top-right",
                autoClose: 2000,
              });
              setTimeout(() => {
                navigate('/');
              }, 2000);
          } else {
            toast.error('Validation error!', result.errors, {
              position: "top-right",
            });
            console.error('Error:', result);
            console.error('Validation Errors:', result.errors); // Log validation errors
            
        }
      }
      }  catch (error) {
        console.error('Error:', error);
        toast.error('Sign in error!', {
          position: "top-right",
        });
      }
    }

    useEffect(() => {
      // Retrieve customer details from cookies or session storage
      const customerId = Cookies.get('customerId') || sessionStorage.getItem('customerId');
  
      if (customerId) {
        // Handle auto-login or redirect based on customer data
        navigate('/');
      }
    }, [navigate]); 

  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      <div className="bg-red/10 w-full p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-4 font-roboto">
          For New Customers
        </h2>

        <form className="space-y-4">
          {/* Salutation Input */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-black font-karla">Salutation</label>
              <input
                required
                name='salutation'
                value={formData.salutation}
                onChange={handleChange}
                type="text"
                placeholder="Mr./Mrs./Ms."
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
            {/* First Name Input */}
            <div>
              <label className="block text-black font-karla">First Name</label>
              <input
                required
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Last Name Input */}
            <div>
              <label className="block text-black font-karla">Last Name</label>
              <input
                required
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-black font-karla">Email</label>
              <input
                required
                name='email'
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="example@example.com"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Address Line 1 */}
            <div>
              <label className="block text-black font-karla">Address Line 1</label>
              <input
                required
                name='addressLine1'
                value={formData.addressLine1}
                onChange={handleChange}
                type="text"
                placeholder="Enter your address"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>

            {/* Address Line 2 */}
            <div>
              <label className="block text-black font-karla">Address Line 2</label>
              <input
                required
                name='addressLine2'
                value={formData.addressLine2}
                onChange={handleChange}
                type="text"
                placeholder="Enter your address (Optional)"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* City Input */}
            <div>
              <label className="block text-black font-karla">City</label>
              <input
                required
                name='city'
                value={formData.city}
                onChange={handleChange}
                type="text"
                placeholder="Enter your city"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>

            {/* Telephone Mobile Input */}
            <div>
              <label className="block text-black font-karla">Mobile Number</label>
              <input
                required
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                type="tel"
                placeholder="+94712345678"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* City Input */}
            <div>
              <label className="block text-black font-karla">Country</label>
              <select
                required
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              >
                {countries && countries.length > 0 ? (
                  countries.map((country) => (
                    <option key={country.countryCode} value={country.countryName}>
                      {country.countryName}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </select>
            </div>

            {/* Telephone Mobile Input */}
            <div>
              <label className="block text-black font-karla">Postal Code</label>
              <input
                required
                name='postalCode'
                value={formData.postalCode}
                onChange={handleChange}
                type="text"
                placeholder="Postal Code"
                className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-black font-karla">Password</label>
            <input
              required
              name='password'
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-black font-karla">Confirm Password</label>
            <input
              required
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border border-black/50 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
            />
          </div>

          <label className="flex items-center space-x-2 text-black font-karla">
              <input type="checkbox" checked={rememberMe} onClick={() => setRememberMe(!rememberMe)} className="accent-yellow" />
              <span>Remember Me</span>
          </label>

          {/* SignUp Button */}
          <button type='submit' onClick={handleSubmit} className="w-full bg-yellow text-white py-2 rounded-md hover:bg-amber font-semibold">
            Sign Up
          </button>
        </form>
      </div>
      <p className='text-sm text-center font-semibold mt-5 font-poppins lg:hidden'>already a customer? <span className='underline cursor-pointer text-amber' onClick={onLogin}>Login</span></p>
    </div>
  )
}
export default SignUp
