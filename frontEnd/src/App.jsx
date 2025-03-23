import "./App.css";


import Product from "./components/Products/Product.jsx";
import ProductList from "./components/Products/ProductList.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/App/About.jsx";


import Cart from "./components/Products/Cart.jsx";
import Navbar from "./components/App/Navbar.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";


import Register from "./components/User/Register.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";
import Userlogin from "./components/User/Userlogin.jsx";
import UserDetails from "./components/User/UserDetails.jsx";
import Logout from "./components/User/Logout.jsx";


import Paperproducts from "./components/Category component/Paperproducts.jsx";
import Desksupply from "./components/Category component/Desksupply.jsx";
import Reusable from "./components/Category component/Reusable.jsx";
import Filling from "./components/Category component/Filling.jsx";


import Writing from "./components/Category component/Writing.jsx";
import BuyProduct from "./components/Products/BuyProduct.jsx";
import UserAddress from "./components/User/UserAddress.jsx";
import Payment from "./components/Payment/Payment.jsx";
removeEventListener;


import Helpdesk from "./components/App/Helpdesk.jsx";
import AddProduct from "./components/Products/AddProduct.jsx";
import UserUpdateDetails from "./components/User/UserUpdateDetails.jsx";
import Wishlisted from "./components/Products/Wishllisted.jsx";
import SearchResult from "./components/App/SearchResult.jsx";
import ChangePassword from "./components/User/ChangePassword.jsx";
import UpdateUserAccountDetails from "./components/User/UpdateUserAccountDetails.jsx";


import UpdateDetails from "./components/User/UpdateDetails.jsx";
import UpdateAvatar from "./components/User/UpdateAvatar.jsx";
import AdminSection from "./components/Admin/AdminSection.jsx";
import KeepAlive from "./keepAlive.jsx";
import AllOrders from "./components/Products/AllOrders.jsx";
import OrderDetails from "./components/Products/OrderDetails.jsx";
import OrderSuccess from "./components/Products/OrderSuccess.jsx";
import Home from "./components/App/Home.jsx";
import Seller from "./components/Seller/Seller.jsx";
import SellerRegister from "./components/Seller/SellerRegister.jsx";
import Sellerlogin from "./components/Seller/SellerLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import ManageSellers from "./components/Admin/ManageSellers.jsx";


function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar />
        {/* Log statement to check if Navbar is rendering */}
        {console.log("Navbar component rendered")}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductList />} />
          <Route path="/About" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Aboutus" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/userLogin" element={<Userlogin />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/PaperProducts" element={<Paperproducts />} />
          <Route path="/DeskSupplies" element={<Desksupply />} />
          <Route path="/ReusableProducts" element={<Reusable />} />
          <Route path="/Filing&Storage" element={<Filling />} />
          <Route path="/WritingInstruments" element={<Writing />} />
          <Route path="/BuyProduct" element={<BuyProduct />} />
          <Route path="/addressUpdate" element={<UserAddress />} />
          <Route path="/wishlist" element={<Wishlisted />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/update" element={<UserUpdateDetails />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/changeDetails" element={<UpdateUserAccountDetails />} />
          <Route path="/updateDetails" element={<UpdateDetails />} />
          <Route path="/updateAvatar" element={<UpdateAvatar />} />
          <Route path="/admin" element={<AdminSection />} />
          <Route path="/myOrder" element={<AllOrders />} />
          <Route path="/orderitems" element={<OrderDetails />} />

          <Route path="/order-success/:orderId" element={<OrderSuccess/>}/>
          <Route path="/seller" element={<Seller/>} />
          <Route path="/sellerRegister" element={<SellerRegister/>} />
          <Route path="/sellerlogin" element={<Sellerlogin/>} />
          <Route path="/admina" element={<AdminDashboard />}/>
          
                    <Route path="/sellers" element={<ManageSellers />} />
        </Routes>
        <KeepAlive />
        <SpeedInsights />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
