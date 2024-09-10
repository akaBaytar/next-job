import { StatsSkeleton } from "@/components/layout/skeleton";

const StatsPageLoading = () => {
  return (
    <div className='grid sm:grid-cols-2 xl:grid-cols-4 gap-4'>
      <StatsSkeleton />
      <StatsSkeleton />
      <StatsSkeleton />
      <StatsSkeleton />
    </div>
  );
}
 
export default StatsPageLoading;