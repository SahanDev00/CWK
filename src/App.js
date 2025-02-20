import Footer from "./components/Shared/Footer";
import Navbar from "./components/Shared/Navbar";
import Home from "./pages/Home/Home";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Products from "./pages/Products/Products";
import NewProducts from "./components/Products/NewProducts";
import Promotions from "./components/Products/Promotions";
import SubCatItems from "./components/Products/SubCatItems";
import SearchedProducts from "./components/Products/SearchedProducts";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/all-products" element={<Products />} />
          <Route path="/new-products" element={<NewProducts />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/products/:subID" element={<SubCatItems />} />
          <Route path="/products/Search/:searchQuery" element={<SearchedProducts />} />
        </Routes>     
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
