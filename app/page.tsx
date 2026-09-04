import { Container } from "@/components/common/container";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/home/hero";

function HomePage() {
  return (
    <div
      className="flex flex-col items-center min-h-screen relative"
      style={{
        background:
          "radial-gradient(125% 100% at 50% 0%, #FFF 6.32%, #E0F0FF 29.28%, #E6EFFD 68.68%, #FFF 100%)",
      }}
    >
      <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto">
        <div className="h-full inset-y-0 left-0 w-px bg-linear-to-b form-neutral-300/50 via-neutral-200 to-transparent absolute" />
        <div className="h-full inset-y-0 right-0 w-px bg-linear-to-b form-neutral-300/50 via-neutral-200 to-transparent absolute" />
      </div>
      <Container className="w-full min-h-screen">
        <Navbar />
        <Hero/>
      </Container>
    </div>
  );
}

export default HomePage;
