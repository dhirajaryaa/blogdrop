import Container from "@/components/common/container"
import Hero from "@/components/home/hero"
import Navbar from "@/components/common/navbar"
import FeaturedFeed from "@/components/home/featured-feed"

const HomePage = () => {
  return (
    <main className="flex flex-col relative">
      <div
        className="flex flex-col items-center min-h-screen relative"
      // style={{
      //   background:
      //     "radial-gradient(125% 100% at 50% 0%, #FFF 6.32%, #E0F0FF 29.28%, #E6EFFD 68.68%, #FFF 100%)",
      // }}
      >
        <Container>
          <Navbar />
          <Hero />
          <FeaturedFeed />
        </Container>
      </div>
    </main>
  )
}

export default HomePage
