import AppShell from "@/components/AppShell";
import {
  reportStats,
  reportCards,
  recentReports,
  reportBuilder,
  reportPreview,
} from "@/data/reports";
import {
  Search,
  Filter,
  Download,
  Plus,
  CalendarClock,
  MoreHorizontal,
  FileText,
  Eye,
  Send,
  Clock3,
  ShieldCheck,
  CheckCircle2,
  FileDown,
  Settings2,
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
    Ready: "bg-emerald-50 text-emerald-600",
    Review: "bg-amber-50 text-amber-600",
    Failed: "bg-red-50 text-red-600",
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

function ReportCard({ item }: { item: any }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-50 text-teal-700">
          <Icon size={22} />
        </div>

        <StatusBadge status={item.status} />
      </div>

      <h3 className="mt-4 text-lg font-bold text-slate-950">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        {item.description}
      </p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <div>
          <p className="text-slate-500">Type</p>
          <p className="font-bold text-slate-900">{item.type}</p>
        </div>

        <div className="text-right">
          <p className="text-slate-500">Generated</p>
          <p className="font-bold text-slate-900">{item.generated}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
          <Download size={16} />
          PDF
        </button>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
          <Eye size={16} />
          Preview
        </button>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Reports</h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate, download, and schedule audit-ready governance reports.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <CalendarClock size={18} />
            Schedule Report
          </button>

          <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
            <Plus size={18} />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-5">
        {reportStats.map((item) => (
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
              placeholder="Search reports..."
              className="h-full min-h-14 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500"
            />
          </div>

          {[
            ["Report Type", "All Types"],
            ["Status", "All Statuses"],
            ["Owner", "All Owners"],
            ["Date Range", "Last 30 days"],
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

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-4">
        {reportCards.map((item) => (
          <ReportCard key={item.title} item={item} />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white shadow-sm 2xl:col-span-8">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <h2 className="text-lg font-bold text-slate-950">
              Recent Generated Reports
            </h2>

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              Filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Report ID</th>
                  <th className="px-5 py-4">Report Name</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Owner</th>
                  <th className="px-5 py-4">Created</th>
                  <th className="px-5 py-4">Size</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentReports.map((report, index) => {
                  const Icon = report.icon;

                  return (
                    <tr
                      key={report.id}
                      className={
                        index === 0
                          ? "bg-blue-50/60"
                          : "bg-white hover:bg-slate-50"
                      }
                    >
                      <td className="px-5 py-4 font-bold text-slate-800">
                        {report.id}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-full bg-teal-50 text-teal-700">
                            <Icon size={18} />
                          </div>

                          <p className="font-semibold text-slate-950">
                            {report.name}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {report.category}
                      </td>

                      <td className="px-5 py-4 text-slate-700">
                        {report.owner}
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {report.created}
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {report.size}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={report.status} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button className="rounded-lg p-2 hover:bg-slate-100">
                            <Download size={17} />
                          </button>
                          <button className="rounded-lg p-2 hover:bg-slate-100">
                            <MoreHorizontal size={17} />
                          </button>
                        </div>
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
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Custom Report Builder
              </h2>

              <Settings2 size={18} className="text-slate-400" />
            </div>

            <div className="space-y-3">
              {reportBuilder.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-2 font-bold text-slate-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800">
              <FileDown size={17} />
              Generate Custom Report
            </button>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Report Preview
              </h2>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                Audit Ready
              </span>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white text-teal-700">
                  <FileText size={21} />
                </div>

                <div>
                  <p className="font-bold text-slate-950">
                    {reportPreview.title}
                  </p>
                  <p className="text-xs text-slate-500">
                    Request ID: {reportPreview.requestId}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Decision</span>
                  <b className="text-red-600">{reportPreview.decision}</b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Risk Score</span>
                  <b className="text-slate-900">{reportPreview.riskScore}</b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Policy</span>
                  <b className="text-right text-slate-900">
                    {reportPreview.policy}
                  </b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Safe Alternative</span>
                  <b className="text-right text-slate-900">
                    {reportPreview.safeAlternative}
                  </b>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Evidence</span>
                  <b className="text-slate-900">
                    {reportPreview.evidenceItems}
                  </b>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
                <Download size={16} />
                Download
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <Send size={16} />
                Share
              </button>
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={23} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Enterprise Audit Report Package
              </h2>
              <p className="text-sm text-slate-500">
                Includes request summary, agent findings, risk score, policy match, approval trail, and evidence logs.
              </p>
            </div>
          </div>

          <button className="flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800">
            <Download size={18} />
            Download Full Package
          </button>
        </div>
      </section>
    </AppShell>
  );
}



