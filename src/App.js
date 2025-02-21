import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Products from "./pages/Products/Products";
import NewProducts from "./components/Products/NewProducts";
import Promotions from "./components/Products/Promotions";
import SubCatItems from "./components/Products/SubCatItems";
import SearchedProducts from "./components/Products/SearchedProducts";
import UserSignUp from "./pages/SignUp/UserSignUp";
import MyProfile from "./components/Account/MyProfile";
import { ToastContainer } from "react-toastify";
import MyOrders from "./components/Cart/MyOrders";
import ProductDescription from "./components/Products/ProductDescription";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/new-products" element={<NewProducts />} />
          <Route path="/sign-up" element={<UserSignUp />} />
          <Route path="/product/:itemID" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/products/:subID" element={<SubCatItems />} />
          <Route path="/products/Search/:searchQuery" element={<SearchedProducts />} />
        </Routes>     
        <Footer/>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
