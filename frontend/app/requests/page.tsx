import AppShell from "@/components/AppShell";
import {
  requestStats,
  requests,
  agentReview,
  activityTimeline,
} from "@/data/requests";
import {
  Search,
  Filter,
  CalendarDays,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  MessageSquareText,
  Download,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldCheck,
  ShieldAlert,
  Clock3,
  XCircle,
} from "lucide-react";

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
    "Pending Review": "bg-amber-50 text-amber-600",
    "In Review": "bg-blue-50 text-blue-600",
    Approved: "bg-emerald-50 text-emerald-600",
    Rejected: "bg-red-50 text-red-600",
    Escalated: "bg-purple-50 text-purple-600",
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

function StatCard({ item }: { item: any }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  const iconMap: Record<string, any> = {
    "Total Requests": FileText,
    "Pending Review": Clock3,
    Escalated: ShieldAlert,
    Approved: ShieldCheck,
    Rejected: XCircle,
  };

  const Icon = iconMap[item.label];

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl ${
            colorMap[item.color]
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

function FilterBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default function RequestsPage() {
  const selected = requests[0];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Requests</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, review, and track sensitive enterprise requests.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <Download size={18} />
            Download Report
          </button>

          <button className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">
            + New Request
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-1 gap-3 2xl:grid-cols-6">
          <div className="relative 2xl:col-span-2">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              placeholder="Search requests..."
              className="h-full min-h-14 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>

          <FilterBox label="Request Type" value="All Types" />
          <FilterBox label="Risk Level" value="All Levels" />
          <FilterBox label="Status" value="All Statuses" />

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <div>
              <p className="text-xs font-medium text-slate-500">Date Range</p>
              <p className="mt-1 text-sm font-bold text-slate-900">
                May 1 - May 31
              </p>
            </div>
            <CalendarDays size={18} className="text-slate-400" />
          </div>
        </div>

        <button className="mt-3 flex items-center gap-2 text-sm font-bold text-teal-700">
          <Filter size={16} />
          Clear Filters
        </button>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {requestStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm 2xl:col-span-9">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-950">
              Requests (128)
            </h2>

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">
                    <input type="checkbox" />
                  </th>
                  <th className="px-5 py-4">Request ID</th>
                  <th className="px-5 py-4">Request Title</th>
                  <th className="px-5 py-4">Requester</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Risk</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Submitted</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {requests.map((request, index) => {
                  const Icon = request.icon;
                  const selectedRow = index === 0;

                  return (
                    <tr
                      key={request.id}
                      className={
                        selectedRow
                          ? "bg-blue-50/60"
                          : "bg-white hover:bg-slate-50"
                      }
                    >
                      <td className="px-5 py-4">
                        <input type="checkbox" defaultChecked={selectedRow} />
                      </td>

                      <td className="px-5 py-4 font-bold text-slate-800">
                        #{request.id}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-950">
                          {request.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {request.department}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                            {request.requester
                              .split(" ")
                              .map((word) => word[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <span className="font-medium text-slate-700">
                            {request.requester}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-50 text-teal-700">
                          <Icon size={18} />
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <RiskBadge risk={request.risk} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={request.status} />
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {request.submitted}
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

          <div className="flex flex-col gap-4 border-t border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              Showing 1 to 8 of 128 requests
            </p>

            <div className="flex items-center gap-2">
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                <ChevronLeft size={16} />
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg bg-slate-950 text-sm font-bold text-white">
                1
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-sm font-bold">
                2
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-sm font-bold">
                3
              </button>
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-5 2xl:col-span-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Request Details
              </h2>

              <button className="text-sm font-bold text-teal-700">Next</button>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-bold text-slate-950">#{selected.id}</p>
                <p className="mt-2 font-bold text-slate-950">
                  {selected.title}
                </p>
              </div>

              <RiskBadge risk={selected.risk} />
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Requester</span>
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
                <span className="text-slate-500">Business Reason</span>
                <b className="text-right text-slate-900">
                  {selected.businessReason}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Data Involved</span>
                <b className="text-right text-slate-900">
                  {selected.dataInvolved}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Submitted</span>
                <b className="text-right text-slate-900">
                  {selected.submitted}
                </b>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-1">
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm font-bold text-emerald-700">
                  Policy Status
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {selected.policyStatus}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-700">
                  Permission Status
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {selected.permissionStatus}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 2xl:grid-cols-2">
              <button className="rounded-xl bg-emerald-600 px-3 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                <Check size={16} className="mr-1 inline" />
                Approve
              </button>

              <button className="rounded-xl bg-red-600 px-3 py-3 text-sm font-bold text-white hover:bg-red-700">
                <X size={16} className="mr-1 inline" />
                Reject
              </button>

              <button className="rounded-xl bg-amber-500 px-3 py-3 text-sm font-bold text-white hover:bg-amber-600">
                <AlertTriangle size={16} className="mr-1 inline" />
                Escalate
              </button>

              <button className="rounded-xl bg-slate-950 px-3 py-3 text-sm font-bold text-white hover:bg-slate-800">
                <MessageSquareText size={16} className="mr-1 inline" />
                Band Room
              </button>
            </div>

            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
              <Download size={17} />
              Download Report
            </button>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">Agent Review</h2>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-1">
              {agentReview.map((item) => (
                <div
                  key={item.agent}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <p className="text-xs font-bold text-slate-950">
                    {item.agent}
                  </p>
                  <p
                    className={`mt-1 text-xs font-bold ${
                      item.status === "Completed"
                        ? "text-emerald-600"
                        : item.status === "In Review"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}
                  >
                    {item.status}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">
              Activity Timeline
            </h2>

            <div className="mt-4 space-y-4">
              {activityTimeline.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full border-2 border-teal-600" />
                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.note}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-5 flex items-center gap-2 text-sm font-bold text-teal-700">
              View Full Audit Trail <ArrowRight size={16} />
            </button>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}



