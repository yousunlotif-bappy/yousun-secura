import AppShell from "@/components/AppShell";
import { integrations, integrationStats } from "@/data/settings";
import { Plus, RefreshCcw, MoreHorizontal, CheckCircle2, Clock3 } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Connected: "bg-emerald-50 text-emerald-600",
    Pending: "bg-amber-50 text-amber-600",
    Failed: "bg-red-50 text-red-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function IntegrationsPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Integrations</h1>
          <p className="mt-1 text-sm text-slate-500">
            Connect identity, security, communication, and evidence systems.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <RefreshCcw size={18} />
            Sync
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Plus size={18} />
            Add Integration
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {integrationStats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon size={23} />
                </div>
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-2xl font-bold text-slate-950">{item.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-950">Connected Systems</h2>
        <p className="mt-1 text-sm text-slate-500">
          These integrations make the governance workflow usable in real enterprise environments.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
          {integrations.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.name} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-teal-700">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-950">{item.name}</h3>
                      <p className="text-sm font-semibold text-slate-500">{item.type}</p>
                    </div>
                  </div>

                  <button className="rounded-lg p-2 hover:bg-white">
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>

                <div className="mt-5 flex items-center justify-between">
                  <StatusBadge status={item.status} />

                  <span className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    {item.status === "Connected" ? (
                      <CheckCircle2 size={16} className="text-emerald-600" />
                    ) : (
                      <Clock3 size={16} className="text-amber-600" />
                    )}
                    {item.status === "Connected" ? "Live" : "Setup required"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}


