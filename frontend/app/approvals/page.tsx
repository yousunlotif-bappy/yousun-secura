import AppShell from "@/components/AppShell";
import {
  approvalStats,
  approvalRequests,
  approvalPath,
  quickSummary,
} from "@/data/approvals";
import {
  Download,
  ShieldCheck,
  Filter,
  ChevronRight,
  Check,
  X,
  ArrowUp,
  Search,
  MoreHorizontal,
  Shield,
} from "lucide-react";

function StatCard({ item }: { item: any }) {
  const Icon = item.icon;

  const styles: Record<string, string> = {
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600",
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

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Pending: "bg-amber-50 text-amber-600",
    Escalated: "bg-purple-50 text-purple-600",
    Approved: "bg-emerald-50 text-emerald-600",
    Rejected: "bg-red-50 text-red-600",
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

function PriorityDot({ priority }: { priority: string }) {
  const styles: Record<string, string> = {
    High: "bg-red-500",
    Medium: "bg-amber-500",
    Low: "bg-emerald-500",
  };

  return (
    <span className="inline-flex items-center gap-2 font-semibold text-slate-800">
      <span className={`h-2 w-2 rounded-full ${styles[priority]}`} />
      {priority}
    </span>
  );
}

export default function ApprovalsPage() {
  const selected = approvalRequests[0];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Approvals</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review and take action on pending approval requests.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <Shield size={18} />
            Approval Policy
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Download size={18} />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {approvalStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm 2xl:col-span-9">
          <div className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-7">
              {[
                "All (23)",
                "High Risk (7)",
                "Due Soon (5)",
                "My Approvals (12)",
                "Escalated to Me (3)",
                "Completed",
              ].map((tab, index) => (
                <button
                  key={tab}
                  className={`border-b-2 pb-3 text-sm font-bold ${
                    index === 0
                      ? "border-slate-950 text-slate-950"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  placeholder="Search approvals..."
                  className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
                />
              </div>

              <button className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-bold text-slate-700 hover:bg-slate-50">
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">
                    <input type="checkbox" />
                  </th>
                  <th className="px-5 py-4">Request</th>
                  <th className="px-5 py-4">Requested By</th>
                  <th className="px-5 py-4">Risk Level</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Due Date</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Open</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {approvalRequests.map((request, index) => {
                  const Icon = request.icon;

                  return (
                    <tr
                      key={request.id}
                      className={
                        index === 0
                          ? "bg-blue-50/60"
                          : "bg-white hover:bg-slate-50"
                      }
                    >
                      <td className="px-5 py-4">
                        <input type="checkbox" defaultChecked={index === 0} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-12 w-12 place-items-center rounded-full bg-red-50 text-red-600">
                            <Icon size={20} />
                          </div>

                          <div>
                            <p className="font-bold text-slate-950">
                              {request.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              Room: {request.room}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                            {request.requester
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {request.requester}
                            </p>
                            <p className="text-xs text-slate-500">
                              {request.department}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <RiskBadge risk={request.risk} />
                      </td>

                      <td className="px-5 py-4">
                        <PriorityDot priority={request.priority} />
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {request.dueDate}
                        </p>
                        <p className="text-xs font-bold text-red-500">
                          {request.timeLeft}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={request.status} />
                      </td>

                      <td className="px-5 py-4">
                        <button className="rounded-lg p-2 hover:bg-slate-100">
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Showing 1 to 7 of 23 requests
            </p>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((item) => (
                <button
                  key={item}
                  className={`grid h-9 w-9 place-items-center rounded-lg text-sm font-bold ${
                    item === 1
                      ? "bg-slate-950 text-white"
                      : "border border-slate-200 text-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-5 2xl:col-span-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Request Details
              </h2>
              <button className="rounded-lg p-2 hover:bg-slate-100">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="flex items-start gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
                <selected.icon size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-950">{selected.title}</p>
                  <RiskBadge risk={selected.risk} />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Room ID:{" "}
                  <b className="text-slate-900">{selected.room}</b>
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Requested By</span>
                <b className="text-right text-slate-900">
                  {selected.requester}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Department</span>
                <b className="text-right text-slate-900">
                  {selected.department}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Data Involved</span>
                <b className="text-right text-slate-900">
                  {selected.dataInvolved}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Business Purpose</span>
                <b className="text-right text-slate-900">
                  {selected.businessPurpose}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Requested</span>
                <b className="text-right text-slate-900">Just now</b>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Approval Path
            </h2>

            <div className="space-y-4">
              {approvalPath.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div
                    className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border ${
                      item.status === "Approved"
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-blue-500 bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.status === "Approved" ? (
                      <Check size={13} />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                    )}
                  </div>

                  <div className="flex-1 rounded-xl bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-bold text-slate-950">
                        {item.title}
                      </p>
                      <span
                        className={`text-xs font-bold ${
                          item.status === "Approved"
                            ? "text-emerald-600"
                            : "text-blue-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{item.note}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                <Check size={17} />
                Approve
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                <X size={17} />
                Reject
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <ArrowUp size={17} />
                Escalate
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Quick Summary
            </h2>

            <div className="space-y-3">
              {quickSummary.map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between gap-4 text-sm"
                >
                  <span className="text-slate-500">{item.label}</span>
                  <b
                    className={
                      item.tone === "red"
                        ? "text-red-600"
                        : "text-slate-900"
                    }
                  >
                    {item.value}
                  </b>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}


