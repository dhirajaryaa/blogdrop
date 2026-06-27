import Header from "@/components/common/Header";

async function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative px-8 mx-auto max-w-6xl w-full min-h-svh py-8 md:py-12">
        {children}
      </main>
    </>
  )
}

export default AppPage;
