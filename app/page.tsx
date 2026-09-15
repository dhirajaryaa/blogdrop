import Container from "@/components/common/container";
import Navbar from "@/components/common/navbar";
import Hero from "@/features/home/components/hero";
import FeaturedFeed from "@/features/home/components/featured-feed";
import HowItWorks from "@/features/home/components/how-it-works";
import FounderNote from "@/features/home/components/founder-note";
import { Footer } from "@/components/common/footer";

const HomePage = () => {
  return (
    <main className="relative flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col">
        <Navbar />
        <Hero />
        <FeaturedFeed />
        <HowItWorks />
        <FounderNote />
        <Footer />
      </Container>
    </main>
  );
};

export default HomePage;