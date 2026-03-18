import { useEffect } from "react";

import { trackPageView } from "@/lib/analytics";
import Comparison from "@/components/landing/Comparison";
import Faqs from "@/components/landing/Faqs";
import Features from "@/components/landing/Features";
import FinalCta from "@/components/landing/FinalCta";
import Hero from "@/components/landing/Hero";
import OpenScource from "@/components/landing/OpenSource";
import Pwa from "@/components/landing/Pwa";
import Stats from "@/components/landing/Stats";
import UiShowcase from "@/components/landing/UiShowcase";
import ScrollToTopButton from "@/components/ScrollToTopButton";

function HomePage() {
  useEffect(() => {
    trackPageView(
      window.location.pathname + window.location.search,
      "Landing Page",
    );
  }, []);

  return (
    <div className="font-poppins">
      <Hero />
      <Stats />
      <Features />
      <UiShowcase />
      <Comparison />
      <OpenScource />
      <Faqs />
      <Pwa />
      <FinalCta />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
