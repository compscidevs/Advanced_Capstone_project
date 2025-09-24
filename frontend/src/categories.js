import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/NavSection/Navbar";
import Categories from "./Components/Categories/Categories";

function Categories_details() {
  return (
    <div className="App">
      <Navbar />     

      <Categories />
      <Footer />
    </div>
  );
}

export default Categories_details;
