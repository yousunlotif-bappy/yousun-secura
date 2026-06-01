import AppShell from "@/components/AppShell";
import {
  policyStats,
  policies,
  selectedPolicyRules,
  recentViolations,
  policySimulation,
} from "@/data/policies";
import {
  Search,
  Filter,
  Plus,
  Download,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  PlayCircle,
  FileText,
  Eye,
  Edit3,
} from "lucide-react";

function StatCard({ item }: { item: any }) {
  const Icon = item.icon;

  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    red: "bg-red-50 text-red-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
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
    Active: "bg-emerald-50 text-emerald-600",
    Draft: "bg-amber-50 text-amber-600",
    Archived: "bg-slate-100 text-slate-500",
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

function RiskBadge({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[risk] || "bg-slate-100 text-slate-600"
      }`}
    >
      {risk}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-600",
    Low: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[severity] || "bg-slate-100 text-slate-600"
      }`}
    >
      {severity}
    </span>
  );
}

export default function PoliciesPage() {
  const selected = policies[0];
  const SelectedIcon = selected.icon;

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Policies</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage governance policies used by agents for review, risk scoring, and approval decisions.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <Download size={18} />
            Export Policies
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Plus size={18} />
            Create Policy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {policyStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 2xl:grid-cols-6">
          <div className="relative 2xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search policies..."
              className="h-full min-h-14 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>

          {[
            ["Category", "All Categories"],
            ["Status", "All Statuses"],
            ["Risk Level", "All Levels"],
            ["Owner", "All Owners"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <button className="mt-3 flex items-center gap-2 text-sm font-bold text-teal-700">
          <Filter size={16} />
          Clear Filters
        </button>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm 2xl:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-950">
              Policy Library
            </h2>

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Policy</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Owner</th>
                  <th className="px-5 py-4">Version</th>
                  <th className="px-5 py-4">Risk</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Violations</th>
                  <th className="px-5 py-4">Updated</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {policies.map((policy, index) => {
                  const Icon = policy.icon;

                  return (
                    <tr
                      key={policy.id}
                      className={
                        index === 0
                          ? "bg-blue-50/60"
                          : "bg-white hover:bg-slate-50"
                      }
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-50 text-teal-700">
                            <Icon size={18} />
                          </div>

                          <div>
                            <p className="font-bold text-slate-950">
                              {policy.id} · {policy.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {policy.description.slice(0, 72)}...
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-700">
                        {policy.category}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {policy.owner}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {policy.version}
                      </td>

                      <td className="px-5 py-4">
                        <RiskBadge risk={policy.risk} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={policy.status} />
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-red-600">
                          {policy.violations}
                        </span>
                        <span className="text-slate-400">
                          {" "}
                          / {policy.exceptions} exceptions
                        </span>
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {policy.lastUpdated}
                      </td>

                      <td className="px-5 py-4">
                        <button className="rounded-lg p-2 hover:bg-slate-100">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="space-y-5 2xl:col-span-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
                  <SelectedIcon size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {selected.id} · {selected.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {selected.description}
                  </p>
                </div>
              </div>

              <StatusBadge status={selected.status} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-500">Owner</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selected.owner}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-500">Version</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selected.version}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-500">Risk</p>
                <p className="mt-1 font-bold text-red-600">{selected.risk}</p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-slate-500">Updated</p>
                <p className="mt-1 font-bold text-slate-900">
                  {selected.lastUpdated}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
                <Eye size={16} />
                View
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <Edit3 size={16} />
                Edit
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Policy Rules
            </h2>

            <div className="space-y-3">
              {selectedPolicyRules.map((rule) => (
                <div
                  key={rule.title}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-slate-950">{rule.title}</p>
                      <p className="mt-1 text-sm text-slate-500">
                        {rule.detail}
                      </p>
                    </div>

                    <SeverityBadge severity={rule.severity} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Recent Violations
            </h2>

            <div className="space-y-3">
              {recentViolations.map((item) => (
                <div
                  key={item.request}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        {item.request}
                      </p>
                      <p className="text-xs text-slate-500">
                        Requested by: {item.requester}
                      </p>
                      <p className="mt-1 text-xs font-bold text-slate-700">
                        Decision: {item.decision}
                      </p>
                    </div>

                    <RiskBadge risk={item.risk} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600">
              <ShieldAlert size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Policy Simulation
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Test a request against active governance rules before execution.
              </p>
            </div>
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 text-sm font-bold text-white hover:bg-teal-800">
            <PlayCircle size={18} />
            Run Simulation
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4 xl:col-span-2">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Test Request
            </p>
            <p className="mt-2 font-bold text-slate-950">
              {policySimulation.request}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Matched Policy
            </p>
            <p className="mt-2 font-bold text-slate-950">
              {policySimulation.matchedPolicy}
            </p>
          </div>

          <div className="rounded-xl bg-red-50 p-4">
            <p className="text-xs font-bold uppercase tracking-widest text-red-400">
              Result
            </p>
            <p className="mt-2 font-bold text-red-600">
              {policySimulation.result}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-emerald-50 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Recommendation
          </p>
          <p className="mt-2 font-bold text-slate-950">
            {policySimulation.recommendation}
          </p>
        </div>
      </section>
    </AppShell>
  );
}


