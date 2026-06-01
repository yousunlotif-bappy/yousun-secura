import AppShell from "@/components/AppShell";
import { agents } from "@/data/agents";
import {
  Search,
  Filter,
  Activity,
  Power,
  RefreshCcw,
  MoreHorizontal,
  Bot,
} from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Online: "bg-emerald-50 text-emerald-600",
    Standby: "bg-amber-50 text-amber-600",
    Offline: "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

export default function ActiveAgentsPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Active Agents
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View live agent status, tasks, health, and current availability.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <RefreshCcw size={18} />
            Refresh
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Power size={18} />
            Start Agent
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-4">
          <div className="relative xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search agents..."
              className="h-full min-h-14 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Status</p>
            <p className="mt-1 text-sm font-bold text-slate-900">All Agents</p>
          </div>

          <button className="flex min-h-14 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-teal-700 hover:bg-slate-50">
            <Filter size={16} />
            Filter Agents
          </button>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
        {agents.map((agent) => {
          const Icon = agent.icon;

          return (
            <section
              key={agent.name}
              className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-teal-700 text-xs font-bold text-white">
                    {agent.initials}
                  </div>

                  <div>
                    <h2 className="font-bold text-slate-950">{agent.name}</h2>
                    <p className="text-sm text-slate-500">{agent.health}</p>
                  </div>
                </div>

                <button className="rounded-lg p-2 hover:bg-slate-100">
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <Icon size={20} className="mt-1 text-teal-700" />
                  <p className="text-sm leading-6 text-slate-600">
                    {agent.role}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Tasks</p>
                  <p className="mt-1 font-bold text-slate-950">
                    {agent.tasks}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Success</p>
                  <p className="mt-1 font-bold text-slate-950">
                    {agent.successRate}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Avg Time</p>
                  <p className="mt-1 font-bold text-slate-950">
                    {agent.responseTime}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <StatusBadge status={agent.status} />

                <span className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <Activity size={16} />
                  Live
                </span>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
            <Bot size={23} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Agent Runtime Health
            </h2>
            <p className="text-sm text-slate-500">
              7 agents online, 1 agent in standby, all critical governance agents are healthy.
            </p>
          </div>
        </div>
      </section>
    </AppShell>
  );
}


