import Faqs from "@/components/Faqs";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AmcMarquee from "@/components/sections/AmcMarquee";
import Cta from "@/components/sections/Cta";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";
import { lazy } from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <AmcMarquee />
      <Features className="mt-20 sm:mt-34" />
      <Faqs className="mt-20 sm:mt-34" />
      <Cta className="mt-20 sm:mt-34" />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
