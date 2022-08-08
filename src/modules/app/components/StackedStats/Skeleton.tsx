const SkeletonStackedStats: React.FC = () => {
  return (
    <div className="stats block divide-y-[1px] sm:inline-grid sm:divide-y-0 shadow w-full">
      <div className="stat animate-pulse">
        <div className="stat-figure">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
        <div className="stat-title h-2 w-1/2  bg-slate-200 rounded"></div>
        <div className="stat-value h-2 w-1/4 bg-slate-200 rounded"></div>
        <div className="stat-desc h-2 w-1/6 bg-slate-200 rounded"></div>
      </div>
      <div className="stat animate-pulse">
        <div className="stat-figure">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
        <div className="stat-title h-2 w-1/2  bg-slate-200 rounded"></div>
        <div className="stat-value h-2 w-1/4 bg-slate-200 rounded"></div>
        <div className="stat-desc h-2 w-1/6 bg-slate-200 rounded"></div>
      </div>
      <div className="stat animate-pulse">
        <div className="stat-figure">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        </div>
        <div className="stat-title h-2 w-1/2  bg-slate-200 rounded"></div>
        <div className="stat-value h-2 w-1/4 bg-slate-200 rounded"></div>
        <div className="stat-desc h-2 w-1/6 bg-slate-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonStackedStats;
