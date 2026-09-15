import AppShell from "@/components/common/app-shell";

const demoUser = {
  name: "Dhiraj Arya",
  email: "dhirajarya.ptn@gmail.com",
  image: null as string | null,
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell user={demoUser}>{children}</AppShell>;
}