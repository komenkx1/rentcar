import { Header } from "@/components/shared/Header";
import { BottomNav } from "@/components/shared/BottomNav";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-surface">
      <Header showNotification showAccount />
      <main className="pt-20 pb-28 md:pb-12">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
