import AppShell from "@/components/AppShell";
import {
  agentStats,
  agents,
  agentWorkflow,
  agentActivity,
} from "@/data/agents";
import {
  Download,
  Network,
  CheckCircle2,
  Circle,
  Activity,
  MessageSquareText,
} from "lucide-react";

function StatCard({ item }: { item: any }) {
  const Icon = item.icon;

  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            styles[item.color]
          }`}
        >
          <Icon size={23} />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">{item.label}</p>
          <p className="text-2xl font-bold text-slate-950">{item.value}</p>
          <p className="text-xs text-slate-500">{item.sub}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Online: "bg-emerald-50 text-emerald-600",
    Standby: "bg-amber-50 text-amber-600",
    Offline: "bg-red-50 text-red-600",
    Completed: "text-emerald-600",
    "In Progress": "text-blue-600",
    Pending: "text-slate-400",
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

export default function AgentOverviewPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">
            Agent Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor the complete multi-agent governance network.
          </p>
        </div>

        <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
          <Download size={18} />
          Export Agent Map
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {agentStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
            <Network size={23} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Multi-Agent Collaboration Map
            </h2>
            <p className="text-sm text-slate-500">
              Agents share structured context through Band Room coordination.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {agents.map((agent) => {
            const Icon = agent.icon;

            return (
              <div
                key={agent.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-teal-700 text-xs font-bold text-white">
                    {agent.initials}
                  </div>

                  <StatusBadge status={agent.status} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Icon size={18} className="text-teal-700" />
                  <h3 className="font-bold text-slate-950">{agent.name}</h3>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {agent.role}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm 2xl:col-span-7">
          <h2 className="text-lg font-bold text-slate-950">
            Current Agent Workflow
          </h2>

          <div className="mt-5 space-y-4">
            {agentWorkflow.map((step) => (
              <div
                key={step.step}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
              >
                <div className="flex items-center gap-3">
                  {step.status === "Completed" ? (
                    <CheckCircle2 size={20} className="text-emerald-600" />
                  ) : step.status === "In Progress" ? (
                    <Circle size={20} className="text-blue-500" />
                  ) : (
                    <Circle size={20} className="text-slate-300" />
                  )}

                  <div>
                    <p className="font-bold text-slate-950">
                      {step.step}. {step.title}
                    </p>
                    <p className="text-sm text-slate-500">{step.agent}</p>
                  </div>
                </div>

                <StatusBadge status={step.status} />
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-5 2xl:col-span-5">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <Activity size={20} className="text-teal-700" />
              <h2 className="text-lg font-bold text-slate-950">
                Live Agent Activity
              </h2>
            </div>

            <div className="space-y-4">
              {agentActivity.map((item) => (
                <div key={item.event} className="rounded-xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">{item.agent}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.event}</p>
                  <p className="mt-2 text-xs font-bold text-teal-700">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquareText size={20} className="text-teal-700" />
              <h2 className="text-lg font-bold text-slate-950">
                Band Collaboration Proof
              </h2>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              Each agent posts its findings into a shared Band Room. Context is
              handed off from intake to policy review, permission review, data
              sensitivity, security risk, human escalation, final decision, and
              audit evidence generation.
            </p>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}


