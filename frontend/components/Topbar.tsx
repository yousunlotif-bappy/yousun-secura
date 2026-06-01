import { Bell, Search, Plus, Download } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <div className="hidden shrink-0 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-sm xl:block">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-teal-600">
              Governance Mode
            </p>
            <p className="text-sm font-bold leading-tight text-slate-900">
              Multi-Agent Control Center
            </p>
          </div>

          <div className="relative min-w-0 flex-1 md:max-w-xl">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search requests, rooms, policies..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <Bell size={17} />
            <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-sky-600 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          <button className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 lg:flex">
            <Download size={17} />
            Download Report
          </button>

          <button className="hidden h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800 sm:flex">
            <Plus size={17} />
            New Request
          </button>

          <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
            AH
          </div>
        </div>
      </div>
    </header>
  );
}



