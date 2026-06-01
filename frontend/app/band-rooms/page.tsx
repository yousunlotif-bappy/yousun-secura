import AppShell from "@/components/AppShell";
import {
  bandRoom,
  discussionMessages,
  agentStatuses,
  workflowSteps,
  relatedDocuments,
  tabs,
} from "@/data/bandRooms";
import {
  ArrowDownToLine,
  MoreVertical,
  Users,
  Clock3,
  Circle,
  CheckCircle2,
  X,
  AlertTriangle,
  Send,
  Paperclip,
  Smile,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

function RiskBadge({ risk }: { risk: string }) {
  return (
    <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
      {risk} Risk
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: "bg-emerald-50 text-emerald-600",
    "In Progress": "bg-blue-50 text-blue-600",
    Pending: "bg-slate-100 text-slate-500",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-100 text-slate-500"
      }`}
    >
      {status}
    </span>
  );
}

function AgentAvatar({
  initials,
  tone,
}: {
  initials: string;
  tone: string;
}) {
  const styles: Record<string, string> = {
    teal: "bg-teal-700 text-white",
    amber: "bg-amber-500 text-white",
    purple: "bg-purple-500 text-white",
    blue: "bg-blue-600 text-white",
    red: "bg-red-500 text-white",
    orange: "bg-orange-500 text-white",
  };

  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold ${
        styles[tone] || "bg-slate-700 text-white"
      }`}
    >
      {initials}
    </div>
  );
}

function DiscussionMessage({ item }: { item: any }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <AgentAvatar initials={item.initials} tone={item.tone} />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-bold text-slate-950">{item.agent}</p>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-500">
                AI Agent
              </span>
            </div>

            <span className="shrink-0 text-xs text-slate-500">
              {item.time}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-700">
            {item.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BandRoomsPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
            <span>Band Rooms</span>
            <ChevronRight size={15} />
            <span className="font-semibold text-slate-700">
              #{bandRoom.id}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-950">Band Room</h1>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
              Active
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Review, discuss and take a secure decision together.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50">
            <ArrowDownToLine size={18} />
            Download Report
          </button>

          <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-5 p-6 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-red-50 text-red-600">
              <Users size={26} />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold text-slate-950">
                  {bandRoom.title}
                </h2>
                <RiskBadge risk={bandRoom.riskLevel} />
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Requested by:{" "}
                <b className="text-slate-900">{bandRoom.requester}</b> ·
                Created: <b className="text-slate-900">{bandRoom.created}</b> ·
                ID: <b className="text-slate-900">#{bandRoom.id}</b>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-10 text-sm">
            <div>
              <p className="text-slate-500">Priority</p>
              <p className="mt-1 flex items-center gap-2 font-bold text-slate-950">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                {bandRoom.priority}
              </p>
            </div>

            <div>
              <p className="text-slate-500">SLA</p>
              <p className="mt-1 flex items-center gap-2 font-bold text-slate-950">
                <Clock3 size={16} />
                {bandRoom.sla}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-8 overflow-x-auto border-t border-slate-100 px-6">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              className={`shrink-0 border-b-2 py-4 text-sm font-bold ${
                index === 0
                  ? "border-slate-950 text-slate-950"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm 2xl:col-span-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">
              Band Discussion
            </h2>

            <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
              All Agents
            </button>
          </div>

          <div className="space-y-4">
            {discussionMessages.map((item) => (
              <DiscussionMessage key={item.agent} item={item} />
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
            <input
              placeholder="Type your message..."
              className="min-h-11 flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none"
            />

            <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-50">
              <Paperclip size={18} />
            </button>

            <button className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 hover:bg-slate-50">
              <Smile size={18} />
            </button>

            <button className="flex h-10 items-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white hover:bg-teal-800">
              <Send size={16} />
              Send
            </button>
          </div>
        </section>

        <section className="space-y-6 2xl:col-span-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">
              Agent Status
            </h2>

            <div className="space-y-3">
              {agentStatuses.map((agent) => (
                <div
                  key={agent.agent}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-teal-700 text-xs font-bold text-white">
                      {agent.initials}
                    </div>

                    <p className="text-sm font-bold text-slate-950">
                      {agent.agent}
                    </p>
                  </div>

                  <StatusBadge status={agent.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Workflow Progress
              </h2>
              <span className="text-sm font-bold text-slate-500">
                5 of 8 completed
              </span>
            </div>

            <div className="mb-5 h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[65%] rounded-full bg-teal-700" />
            </div>

            <div className="space-y-4">
              {workflowSteps.map((step) => (
                <div
                  key={step.title}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    {step.status === "Completed" ? (
                      <CheckCircle2 size={18} className="text-emerald-600" />
                    ) : step.status === "In Progress" ? (
                      <Circle size={18} className="text-blue-500" />
                    ) : (
                      <Circle size={18} className="text-slate-300" />
                    )}

                    <p className="text-sm font-semibold text-slate-700">
                      {step.title}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold ${
                      step.status === "Completed"
                        ? "text-emerald-600"
                        : step.status === "In Progress"
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  >
                    {step.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6 2xl:col-span-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Room Details
              </h2>
              <button className="text-sm font-bold text-teal-700">Edit</button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Room ID</span>
                <b className="text-right text-slate-900">#{bandRoom.id}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Created</span>
                <b className="text-slate-900">{bandRoom.created}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Requested by</span>
                <b className="text-slate-900">{bandRoom.requester}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Department</span>
                <b className="text-slate-900">{bandRoom.department}</b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Data Involved</span>
                <b className="text-right text-slate-900">
                  {bandRoom.dataInvolved}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Business Purpose</span>
                <b className="text-right text-slate-900">
                  {bandRoom.businessPurpose}
                </b>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Risk Level</span>
                <b className="text-red-600">{bandRoom.riskLevel}</b>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-3 text-sm font-bold text-slate-950">
                Participants (7)
              </p>

              <div className="flex -space-x-2">
                {agentStatuses.slice(0, 6).map((agent) => (
                  <div
                    key={agent.agent}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-teal-100 text-xs font-bold text-teal-700"
                  >
                    {agent.initials}
                  </div>
                ))}
                <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-slate-100 text-xs font-bold text-slate-500">
                  +2
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Actions</h2>

            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                <ShieldCheck size={17} />
                Approve Request
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                <X size={17} />
                Reject Request
              </button>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 hover:bg-slate-50">
                <AlertTriangle size={17} />
                Escalate to Human
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-950">
                Related Documents
              </h2>
              <button className="text-sm font-bold text-teal-700">
                View all
              </button>
            </div>

            <div className="space-y-3">
              {relatedDocuments.map((doc) => {
                const Icon = doc.icon;

                return (
                  <div
                    key={doc.title}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-950">
                        {doc.title}
                      </p>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>

                    <Icon size={17} className="text-slate-500" />
                  </div>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}


