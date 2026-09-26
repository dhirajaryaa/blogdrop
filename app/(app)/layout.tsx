import AppShell from "@/components/common/app-shell";


export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppShell>{children}</AppShell>;
}