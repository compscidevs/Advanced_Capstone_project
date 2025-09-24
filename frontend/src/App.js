import Main from "./main";
import Categories_details from "./categories";
import Product_Details from "./product";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/auth/register/Register";
import CreatePassword from "./Components/auth/createPassword/CreatePassword";
import Login from "./Components/auth/login/Login";
import Logout from "./Components/auth/logout/Logout";
import ForgotPassword from "./Components/auth/forgotPassword/ForgotPassword";
import SellerMain from "./seller_components/sell";
import VendorSignUp from "./seller_components/signup-page";
import BusinessSignIn from "./seller_components/signin-page";
import Payment from "./seller_components/payment";

function App() {
  return (
   
      <Router>
        <Routes>

          <Route path="/" element={<Main />} />
          <Route path="/product/:id" element={<Product_Details />} />
          <Route path="categories" element={<Categories_details />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="logout" element={<Logout />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="create-new-password" element={<CreatePassword />} />
          <Route path="vendor" element={<SellerMain />} />
          <Route path="vendor-signup" element={<VendorSignUp />} />
          <Route path="vendor-login" element={<BusinessSignIn />} />  
          <Route path="payments" element={<Payment />} />          

        </Routes>
      </Router>
    
  );
}

export default App;