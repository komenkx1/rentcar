import { OwnerSidebar } from "@/components/shared/AdminSidebar";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <OwnerSidebar />
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
