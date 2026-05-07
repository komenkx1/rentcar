import { VehicleCardSkeleton } from "@/components/shared/Skeleton";

export default function CustomerLoading() {
  return (
    <div className="animate-fade-in">
      <section className="px-5 pt-6 pb-4">
        <div className="h-9 w-64 bg-surface-container rounded-lg animate-pulse mb-2" />
        <div className="h-5 w-48 bg-surface-container rounded-lg animate-pulse" />
      </section>
      <section className="px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
