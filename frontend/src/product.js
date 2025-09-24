import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/NavSection/Navbar";

import ProductDetails from "./Components/ProductDetailsPage/ProductDetails";

function Product_Details() {
  return (
    <div className="App">
      <Navbar />

      <ProductDetails />

      <Footer />
    </div>
  );
}

export default Product_Details;
