import HeroSection from "@/components/home/HeroSection";
import TrustedSources from "@/components/home/TrustedSources";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeaturesGrid from "@/components/home/FeaturesGrid";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function Home() {
  return (
    <>
    <Header />
    <main className="flex-1">
      <HeroSection />
      <TrustedSources />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesGrid />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
    </>
  );
}
