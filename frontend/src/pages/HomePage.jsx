import ScrollToTopButton from "@/components/ScrollToTopButton";
import AmcMarquee from "@/components/sections/AmcMarquee";
import Cta from "@/components/sections/Cta";
import Faqs from "@/components/sections/Faqs";
import Features from "@/components/sections/Features";
import Hero from "@/components/sections/Hero";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
      <AmcMarquee className="mt-24 sm:mt-34" />
      <Faqs className="mt-24 sm:mt-34" />
      <Cta className="mt-20 sm:mt-34" />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
