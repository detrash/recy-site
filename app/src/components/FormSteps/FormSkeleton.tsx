export const FormSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 justify-between gap-4 sm:gap-12">
      <section className="mb-3 sm:m-0 animate-pulse">
        <div className="rounded bg-slate-200 h-12 w-1/2 mb-3 "></div>

        <div className="rounded bg-slate-200 h-3 w-auto mb-2"></div>

        <div className="rounded bg-slate-200 h-3 w-auto"></div>

        <div className="rounded bg-slate-200 h-3 w-auto mt-2"></div>
      </section>

      <section className="animate-pulse">
        <div className="rounded bg-slate-200 h-3 w-auto mb-3"></div>

        <div className="grid grid-cols-6 gap-3">
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
          <div className="rounded bg-slate-200 h-10 w-auto col-span-6 sm:col-span-3"></div>
        </div>
      </section>

      <div className="flex items-end justify-center ">
        <div className="rounded bg-slate-200 h-12 w-3/6 animate-pulse"></div>
      </div>
    </div>
  );
};
