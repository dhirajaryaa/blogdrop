import Header from "@/components/common/Header";

async function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative p-8 mx-auto max-w-6xl w-full min-h-svh md:py-10">
        {children}
      </main>
    </>
  )
}

export default AppPage;
