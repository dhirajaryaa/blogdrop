import Container from "@/components/common/container";
import Hero from "@/features/home/components/hero";
import FeatureStrip from "@/features/home/components/feature-strip";
import Navbar from "@/components/common/navbar";
import FeaturedFeed from "@/features/home/components/featured-feed";
import HowItWorks from "@/features/home/components/how-it-works";
import Faq from "@/features/home/components/faq";
import FounderNote from "@/features/home/components/founder-note";
import { Footer } from "@/components/common/footer";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "BlogDrop — Engineering blogs, one feed.",
  description:
    "A quieter place to discover how real teams build things. Personalized feed of curated engineering articles from the teams building what's next.",
});

const HomePage = () => {
  return (
    <main className="relative flex flex-col">
      <div
        className="relative flex min-h-screen flex-col items-center"
        style={{
          background:
            "radial-gradient(125% 100% at 50% 0%, var(--background) 0%, color-mix(in oklch, var(--primary) 6%, var(--background)) 40%, var(--background) 100%)",
        }}
      >
        <Container>
          <Navbar />
          <Hero />
          <FeatureStrip />
          <FeaturedFeed />
          <HowItWorks />
          <Faq />
          <FounderNote />
          <Footer />
        </Container>
      </div>
    </main>
  );
};

export default HomePage;