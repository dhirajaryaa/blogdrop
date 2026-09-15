import Container from "@/components/common/container";
import Hero from "@/features/home/components/hero";
import Navbar from "@/components/common/navbar";
import FeaturedFeed from "@/features/home/components/featured-feed";
import FounderNote from "@/features/home/components/founder-note";
import { Footer } from "@/components/common/footer";

const HomePage = () => {
  return (
    <main className="relative flex flex-col">
      <div
        className="relative flex min-h-screen flex-col items-center"
      // style={{
      //   background:
      //     "radial-gradient(125% 100% at 50% 0%, #FFF 6.32%, #E0F0FF 29.28%, #E6EFFD 68.68%, #FFF 100%)",
      // }}
      >
        <Container>
          <Navbar />
          <Hero />
          <FeaturedFeed />
          <FounderNote />
          <Footer />
        </Container>
      </div>
    </main>
  );
};

export default HomePage;
