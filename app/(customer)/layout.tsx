import { Header } from "@/components/shared/Header";
import { BottomNav } from "@/components/shared/BottomNav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface">
      <Header showNotification showAccount />
      <main className="pt-20 pb-24 md:pb-12 max-w-7xl mx-auto md:px-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
