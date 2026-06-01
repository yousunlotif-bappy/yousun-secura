import AppShell from "@/components/AppShell";
import { performanceMetrics, performanceRows } from "@/data/agents";
import {
  Download,
  BarChart3,
  TrendingUp,
  Activity,
  Clock3,
  CheckCircle2,
} from "lucide-react";

function MetricCard({ item }: { item: any }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
          <Icon size={23} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="text-2xl font-bold text-slate-950">{item.value}</p>
          <p className="text-xs text-emerald-600">Above target</p>
        </div>
      </div>
    </div>
  );
}

export default function AgentPerformancePage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Agent Performance
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Analyze agent speed, success rate, completion quality, and escalation behavior.
          </p>
        </div>

        <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
          <Download size={18} />
          Export Performance
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {performanceMetrics.map((item) => (
          <MetricCard key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm 2xl:col-span-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
              <BarChart3 size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Agent Performance Overview
              </h2>
              <p className="text-sm text-slate-500">
                Current operating quality across all governance agents.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {[
              ["Policy Match Accuracy", "98%"],
              ["Context Handoff Success", "99%"],
              ["Human Escalation Accuracy", "95%"],
              ["Audit Evidence Completion", "98%"],
            ].map(([label, value]) => (
              <div key={label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-700">{label}</span>
                  <span className="font-bold text-slate-950">{value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-teal-700" style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm 2xl:col-span-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <TrendingUp size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Weekly Performance Trend
              </h2>
              <p className="text-sm text-slate-500">
                Simulated trend view for demo and judging presentation.
              </p>
            </div>
          </div>

          <div className="grid h-72 place-items-center rounded-2xl bg-slate-50">
            <div className="text-center">
              <Activity size={42} className="mx-auto text-teal-700" />
              <p className="mt-3 text-xl font-bold text-slate-950">
                Performance Trend: Stable + Improving
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Agent completion quality increased by 12% this week.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-950">
            Agent Performance Table
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">Agent</th>
                <th className="px-5 py-4">Completed Tasks</th>
                <th className="px-5 py-4">Avg Time</th>
                <th className="px-5 py-4">Success Rate</th>
                <th className="px-5 py-4">Escalations</th>
                <th className="px-5 py-4">Health</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {performanceRows.map((row) => (
                <tr key={row.agent} className="hover:bg-slate-50">
                  <td className="px-5 py-4 font-bold text-slate-950">
                    {row.agent}
                  </td>

                  <td className="px-5 py-4 text-slate-700">
                    {row.completed}
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 font-semibold text-slate-700">
                      <Clock3 size={16} />
                      {row.avgTime}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold text-emerald-600">
                    {row.success}
                  </td>

                  <td className="px-5 py-4 font-bold text-amber-600">
                    {row.escalations}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                      <CheckCircle2 size={14} />
                      Healthy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}



