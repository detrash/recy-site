export const ResidueCardSkeleton: React.FC = () => {
  return (
    <main className="py-4 px-6 rounded-xl shadow-lg bg-white border">
      <div className="rounded-full bg-slate-200 h-10 w-10 mb-3 animate-pulse"></div>

      <section className="grid grid-cols-2 gap-2 animate-pulse">
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
        <div className="rounded-full bg-slate-200 h-2 w-auto"></div>
      </section>
    </main>
  );
};
