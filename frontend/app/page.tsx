import AppShell from "@/components/AppShell";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock,
  FileText,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Requests",
    value: "128",
    change: "+18%",
    icon: FileText,
    tone: "bg-slate-950 text-white",
  },
  {
    label: "Pending Review",
    value: "18",
    change: "6 urgent",
    icon: Clock,
    tone: "bg-amber-100 text-amber-700",
  },
  {
    label: "High Risk",
    value: "09",
    change: "Needs action",
    icon: AlertTriangle,
    tone: "bg-red-100 text-red-700",
  },
  {
    label: "Approved",
    value: "74",
    change: "+12 today",
    icon: CheckCircle2,
    tone: "bg-emerald-100 text-emerald-700",
  },
  {
    label: "Active Band Rooms",
    value: "07",
    change: "Live review",
    icon: MessageSquareText,
    tone: "bg-teal-100 text-teal-700",
  },
];

const agentSteps = [
  {
    name: "Request Intake Agent",
    status: "Completed",
    note: "Request summarized and routed.",
  },
  {
    name: "Permission Agent",
    status: "Failed",
    note: "Requester role has limited access.",
  },
  {
    name: "Policy Review Agent",
    status: "Violation",
    note: "DP-03 restricts raw customer export.",
  },
  {
    name: "Data Sensitivity Agent",
    status: "High Risk",
    note: "Customer emails detected as PII.",
  },
];

const decisions = [
  {
    label: "Risk Score",
    value: "85",
    note: "High",
  },
  {
    label: "Policy Match",
    value: "DP-03",
    note: "Data Export Policy",
  },
  {
    label: "Approval Path",
    value: "Manager",
    note: "Security required",
  },
  {
    label: "Decision",
    value: "Reject",
    note: "Raw export blocked",
  },
  {
    label: "Safe Alternative",
    value: "Anonymize",
    note: "Use audience segment",
  },
  {
    label: "Audit Status",
    value: "Ready",
    note: "Evidence captured",
  },
];

function StatCard({ item }: { item: (typeof stats)[number] }) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${item.tone}`}>
          <Icon size={22} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-tight text-slate-500">
            {item.label}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-950">
            {item.value}
          </h3>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
        <span className="text-xs font-semibold text-slate-500">
          {item.change}
        </span>
        <ArrowUpRight size={16} className="text-teal-600" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <AppShell>
      <div>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600">
              YOUSUN Secura
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">
              Governance Command Center
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Monitor sensitive enterprise actions, agent reviews, policy
              decisions, human approvals and audit-ready evidence from one
              control center.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">
                  Secura Online
                </p>
                <p className="text-xs text-slate-500">
                  8 agents ready for review
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fix 3: Responsive Dashboard Grid */}
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((item) => (
            <StatCard key={item.label} item={item} />
          ))}
        </div>

        {/* Fix 4: Responsive Main Content Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
          <section className="xl:col-span-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Active Request Review
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current high-risk action under multi-agent governance review.
                </p>
              </div>

              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                High Risk
              </span>
            </div>

            <div className="mt-5 rounded-2xl bg-slate-50 p-5">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-950 text-white">
                  <LockKeyhole size={22} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-950">
                    Marketing Intern Data Export
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Marketing intern wants to export 50,000 customer emails for
                    a campaign. The request involves raw customer data and
                    requires policy, permission, data sensitivity and security
                    review.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              {agentSteps.map((agent) => (
                <div
                  key={agent.name}
                  className="rounded-2xl border border-slate-100 bg-white p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-slate-900">
                      {agent.name}
                    </p>
                    <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {agent.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    {agent.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="xl:col-span-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-teal-50 text-teal-700">
                <Bot size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Agent Network
                </h2>
                <p className="text-sm text-slate-500">
                  Live specialist agents reviewing enterprise actions.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["Permission Agent", "Online", "Role and scope validation"],
                ["Policy Agent", "Online", "Company rule matching"],
                ["Risk Agent", "Busy", "Security scoring in progress"],
                ["Audit Agent", "Online", "Evidence timeline capture"],
              ].map(([name, status, note]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-950">{name}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {note}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      status === "Busy"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="xl:col-span-3 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-sky-50 text-sky-700">
                <Users size={22} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-950">
                  Human Review
                </h2>
                <p className="text-sm text-slate-500">
                  Approval queue and escalation status.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-800">
                  6 approvals pending
                </p>
                <p className="mt-1 text-sm leading-5 text-amber-700">
                  Requests need manager or security officer review.
                </p>
              </div>

              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-sm font-bold text-red-800">
                  3 SLA warnings
                </p>
                <p className="mt-1 text-sm leading-5 text-red-700">
                  High-risk requests are waiting for final decision.
                </p>
              </div>

              <button className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">
                Open Approval Queue
              </button>
            </div>
          </section>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                Decision Summary
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Final governance output generated from agent findings and human
                approval rules.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-bold text-teal-700">
              <Activity size={16} />
              Audit Ready
            </div>
          </div>

          {/* Fix 5: Responsive Decision Summary Grid */}
          <div className="mt-6 grid grid-cols-1 items-end gap-5 md:grid-cols-3 xl:grid-cols-6">
            {decisions.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  {item.label}
                </p>
                <h3 className="mt-2 break-words text-xl font-bold text-slate-950">
                  {item.value}
                </h3>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}


