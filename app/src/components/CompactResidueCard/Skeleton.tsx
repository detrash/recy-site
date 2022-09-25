export const CompactResidueCardSkeleton: React.FC = () => {
  return (
    <main className="px-4 py-2 border-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-slate-200 h-10 w-10 mb-3 animate-pulse"></div>
        <div className="w-1/3 flex flex-col gap-1">
          <div className="rounded-full bg-slate-200 h-2 w-auto animate-pulse"></div>
          <div className="rounded-full bg-slate-200 h-2 w-auto animate-pulse"></div>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-2 animate-pulse">
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
      </section>
    </main>
  );
};
