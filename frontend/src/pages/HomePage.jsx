import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AmcMarquee from "@/components/landing/AmcMarquee";
import Community from "@/components/landing/Community";
import Cta from "@/components/landing/Cta";
import Faqs from "@/components/landing/Faqs";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import Quote from "@/components/landing/Quote";

function HomePage() {
  useEffect(() => {
    trackPageView(
      window.location.pathname + window.location.search,
      "Landing Page",
    );
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <AmcMarquee />
      <Features className="mt-24 sm:mt-34" />
      <Community className="mt-24 sm:mt-34" />
      <Faqs className="mt-28 sm:mt-34" />
      <Quote />
      <Cta className="mt-24 sm:mt-34" />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
