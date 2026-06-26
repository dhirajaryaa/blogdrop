import Header from "@/components/common/Header";

async function AppPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="relative p-4">
        {children}
      </main>
    </>
  )
}

export default AppPage;
