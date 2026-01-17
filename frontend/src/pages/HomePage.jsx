import ScrollToTopButton from "@/components/ScrollToTopButton";
import AmcMarquee from "@/components/landing/AmcMarquee";
import Cta from "@/components/landing/Cta";
import Faqs from "@/components/landing/Faqs";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Quote from "@/components/landing/Quote";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <Features />
      <AmcMarquee className="mt-24 sm:mt-34" />
      <Faqs className="mt-28 sm:mt-34" />
      <Quote />
      <Cta className="mt-24 sm:mt-34" />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
