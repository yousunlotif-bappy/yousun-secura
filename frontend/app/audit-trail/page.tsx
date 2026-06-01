import AppShell from "@/components/AppShell";
import {
  auditStats,
  auditRecords,
  verificationSummary,
  auditTimeline,
  linkedDocuments,
} from "@/data/auditTrail";
import {
  Search,
  CalendarDays,
  RotateCcw,
  Download,
  FileText,
  MoreVertical,
  Eye,
  ExternalLink,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function StatCard({ item }: { item: any }) {
  const Icon = item.icon;

  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
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
          <p className="text-xs text-emerald-600">{item.sub}</p>
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
    Completed: "bg-emerald-50 text-emerald-600",
    Escalated: "bg-purple-50 text-purple-600",
    Pending: "bg-amber-50 text-amber-600",
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

function TimelineDot({ color }: { color: string }) {
  const styles: Record<string, string> = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
    green: "bg-emerald-500",
  };

  return (
    <span
      className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
        styles[color] || "bg-slate-400"
      }`}
    />
  );
}

export default function AuditTrailPage() {
  const selected = auditRecords[0];

  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Audit Trail</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track every decision, review step, and approval event across the platform.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <FileText size={18} />
            Export Audit Report
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Download size={18} />
            Download Logs
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
              placeholder="Search audit records..."
              className="h-full min-h-14 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>

          <FilterBox label="Event Type" value="All Types" />
          <FilterBox label="Risk Level" value="All Levels" />
          <FilterBox label="Status" value="All Statuses" />
          <FilterBox label="Agent" value="All Agents" />
        </div>

        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900">
            <CalendarDays size={17} className="text-slate-400" />
            May 7, 2025 - May 14, 2025
          </div>

          <button className="flex items-center gap-2 text-sm font-bold text-teal-700">
            <RotateCcw size={16} />
            Clear Filters
          </button>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {auditStats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm 2xl:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-950">Audit Records</h2>

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Event ID</th>
                  <th className="px-5 py-4">Request / Action</th>
                  <th className="px-5 py-4">Event Type</th>
                  <th className="px-5 py-4">Actor / Agent</th>
                  <th className="px-5 py-4">Risk</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Timestamp</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {auditRecords.map((record, index) => {
                  const Icon = record.icon;

                  return (
                    <tr
                      key={record.id}
                      className={
                        index === 0
                          ? "bg-blue-50/60"
                          : "bg-white hover:bg-slate-50"
                      }
                    >
                      <td className="px-5 py-4 font-bold text-slate-800">
                        {record.id}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-50 text-teal-700">
                            <Icon size={18} />
                          </div>
                          <p className="font-semibold text-slate-950">
                            {record.request}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {record.eventType}
                      </td>

                      <td className="px-5 py-4 font-medium text-slate-700">
                        {record.actor}
                      </td>

                      <td className="px-5 py-4">
                        <RiskBadge risk={record.risk} />
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={record.status} />
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {record.timestamp}
                      </td>

                      <td className="px-5 py-4">
                        <button className="rounded-lg p-2 hover:bg-slate-100">
                          <MoreVertical size={18} />
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
              Showing 1 to 8 of 1,248 results
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
              <button className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <aside className="space-y-5 2xl:col-span-4">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Audit Event Details
              </h2>

              <StatusBadge status={selected.status} />
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Audit ID</span>
                <b className="text-right text-slate-900">{selected.id}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Linked Room ID</span>
                <b className="text-right text-teal-700">{selected.linkedRoom}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Requester</span>
                <b className="text-right text-slate-900">{selected.actor}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Event Type</span>
                <b className="text-right text-slate-900">{selected.eventType}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Risk Level</span>
                <RiskBadge risk={selected.risk} />
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Decision</span>
                <b className="text-right text-slate-900">{selected.decision}</b>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3 2xl:grid-cols-3">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-3 text-sm font-bold text-white hover:bg-slate-800">
                <Eye size={16} />
                View Log
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <Download size={16} />
                Evidence
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <ExternalLink size={16} />
                Request
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Verification Summary
            </h2>

            <div className="space-y-3">
              {verificationSummary.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-50 text-blue-600">
                        <Icon size={17} />
                      </div>

                      <p className="text-sm font-bold text-slate-950">
                        {item.label}
                      </p>
                    </div>

                    <CheckCircle2 size={18} className="text-emerald-600" />
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Timeline</h2>

            <div className="space-y-4">
              {auditTimeline.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <TimelineDot color={item.color} />

                  <div>
                    <p className="text-xs font-bold text-slate-400">
                      {item.time}
                    </p>
                    <p className="text-sm font-bold text-slate-950">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Linked Documents
              </h2>

              <button className="text-sm font-bold text-teal-700">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {linkedDocuments.map((doc) => (
                <div
                  key={doc.title}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                >
                  <p className="text-sm font-bold text-slate-950">
                    {doc.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    {doc.type} · {doc.version}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{doc.date}</p>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Audit Ready Evidence Package
              </h2>
              <p className="text-sm text-slate-500">
                Download the full audit evidence for compliance review.
              </p>
            </div>
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">
            <Download size={18} />
            Download Evidence Package
          </button>
        </div>
      </section>
    </AppShell>
  );
}



