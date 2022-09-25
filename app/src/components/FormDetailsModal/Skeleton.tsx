import { CompactResidueCardSkeleton } from '../CompactResidueCard/Skeleton';

export const FormDetailsModalSkeleton: React.FC = () => {
  return (
    <div>
      <section className="animate-pulse grid sm:grid-cols-2 gap-2 mb-5">
        <div className="rounded bg-slate-200 h-3 w-auto"></div>
        <div className="rounded bg-slate-200 h-3 w-auto"></div>
      </section>

      <div className="animate-pulse grid grid-cols-1 sm:flex sm:items-center gap-2 mb-2">
        <div className="rounded bg-slate-200 h-5 w-1/4"></div>
        <div className="rounded bg-slate-200 h-5 w-1/4"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Array.from({ length: 5 })
          .fill(0)
          .map((_, index) => (
            <CompactResidueCardSkeleton key={index} />
          ))}
      </div>
      <div className="rounded bg-slate-200 h-3 w-auto mt-2 mb-3"></div>
    </div>
  );
};
