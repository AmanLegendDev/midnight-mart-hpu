import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/store/Hero";
import FeaturedProducts from "@/components/store/FeaturedProducts";
import CategoriesPreview from "@/components/store/CategoriesPreview";
import CategoriesSlider from "@/components/store/CategoriesSlider";
import WhyChooseUs from "@/components/store/WhyChooseUs";
import TrustStrip from "@/components/store/TrustStrip";
import AboutBrand from "@/components/store/AboutBrand";

export default function Home() {
  return (
    <main>
       <Navbar />
       <Hero />
       <CategoriesSlider />
       <FeaturedProducts />
       <WhyChooseUs />
       <TrustStrip />
       <AboutBrand />
     

    </main>
  );
}