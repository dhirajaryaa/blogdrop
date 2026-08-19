import HeroSection from "@/components/home/HeroSection";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import HowItWorks from "@/components/home/HowItWorks";
import WhyLoveIt from "@/components/home/WhyLoveIt";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";
import AppHeader from "@/components/common/app-header";
import Footer from "@/components/common/Footer";
import ProductPreview from "@/components/home/ProductPreview";

export default function Home() {
  return (
    <>
    <AppHeader/>
      <HeroSection />
      <ProductPreview/>
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      <HowItWorks />
      <WhyLoveIt />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
