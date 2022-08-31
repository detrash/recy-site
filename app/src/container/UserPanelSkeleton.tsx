import { ResidueCardSkeleton } from 'src/components/ResidueCard/ResidueCardSkeleton';
import SkeletonStackedStats from 'src/components/StackedStats/Skeleton';

export const UserPanelSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 ">
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between animate-pulse">
        <div className="rounded-full bg-slate-200 h-3 w-1/3"></div>
        <div className="rounded-full bg-slate-200 h-3 w-1/3"></div>
      </section>
      <SkeletonStackedStats />
      <div className="grid grid-cols-6 gap-3 ">
        <div className="flex-1 col-span-6 sm:col-span-4">
          <div className="rounded-full bg-slate-200 h-3 w-1/2 mb-3 animate-pulse"></div>
          <div className="grid grid-cols-6 gap-3">
            {Array.from({ length: 6 })
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="col-span-3 sm:col-span-3 md:col-span-2 "
                >
                  <ResidueCardSkeleton />
                </div>
              ))}
          </div>
        </div>

        <div className="py-4 px-6 bg-white shadow rounded-md flex flex-col gap-3 col-span-6 sm:col-span-2">
          <div className="flex flex-col gap-3 animate-pulse">
            <div className="rounded-full bg-slate-200 h-3 w-1/2"></div>
            <div className="rounded-full bg-slate-200 h-2 w-1/3"></div>
          </div>

          <div className="rounded-md bg-slate-200 flex-1 animate-pulse"></div>
          <div className="animate-pulse rounded-full bg-slate-200 h-2 "></div>
        </div>
      </div>
      <div className="py-4 px-6 bg-white shadow rounded-md flex-1">
        <div className="rounded-full bg-slate-200 h-2 w-1/3 mb-3 animate-pulse"></div>

        <div className="grid grid-cols-6 gap-3 animate-pulse">
          {Array.from({ length: 15 })
            .fill(0)
            .map((_, index) => (
              <div key={index} className="rounded-full bg-slate-200 h-3"></div>
            ))}
        </div>
      </div>
    </div>
  );
};
