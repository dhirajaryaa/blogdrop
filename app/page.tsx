import HeroSection from "@/components/home/HeroSection";
import TrustedSources from "@/components/home/TrustedSources";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import ProductPreview from "@/components/home/ProductPreview";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/common/Navbar";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="flex-1">
      <HeroSection />
      <TrustedSources />
      <ProblemSection />
      <SolutionSection />
      <ProductPreview />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
    </>
  );
}
