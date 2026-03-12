import ScrollToTopButton from "@/components/ScrollToTopButton";
import Comparison from "@/components/landing/Comparison";
import Faqs from "@/components/landing/Faqs";
import Features from "@/components/landing/Features";
import FinalCta from "@/components/landing/FinalCta";
import Hero from "@/components/landing/Hero";
import Pwa from "@/components/landing/Pwa";
import Stats from "@/components/landing/Stats";
import UiShowcase from "@/components/landing/UiShowcase";
import { Button } from "@/components/ui/button";
import { trackPageView } from "@/lib/analytics";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { useEffect } from "react";

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
      <Faqs />
      <Pwa />
      <FinalCta />
      <ScrollToTopButton />
      {/* <Button size="lg" className="ml-[30%] font-normal mt-20 bg-landing rounded-full">
        <GithubLogoIcon /> Star On Github
      </Button> */}
    </div>
  );
}

export default HomePage;
