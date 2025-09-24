import { Footer } from "./Components/Footer/Footer";
import { HeroSection } from "./Components/HeroSection/HeroSection";
import { Navbar } from "./Components/NavSection/Navbar";
import { ProductCard } from "./Components/ProductCard/ProductCard";
import { ProductData } from "./Components/ProductCard/PdroductData";
import { ServicesCard } from "./Components/ServicesCard/ServicesCard";
import { ServicesData } from "./Components/ServicesCard/ServicesData";
import StoresSection from "./Components/StoresSection/StoresSection";

function Main() {
  
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <ProductCard dataItems={ProductData} >Super Deals</ProductCard>
      <ServicesCard dataItems={ServicesData}>Top Rated Services</ServicesCard>
      <StoresSection />
      <ProductCard dataItems={ProductData}>Top Rated Products</ProductCard>
      <ProductCard dataItems={ProductData}>Recommended For You</ProductCard>
      <Footer />
    </div>
  );
}

export default Main;
