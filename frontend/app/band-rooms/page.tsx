"use client";

import { useEffect, useState } from "react";
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
  PlayCircle,
  Loader2,
  Server,
  CheckCheck,
} from "lucide-react";
import {
  getBandLiveProof,
  getDownloadReportUrl,
  runGovernanceWorkflow,
  type BandLiveProof,
} from "@/lib/api";

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

function LiveFindingCard({ finding }: { finding: any }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold text-slate-950">{finding.agent}</p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            {finding.finding}
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
          {finding.status}
        </span>
      </div>
    </div>
  );
}

function YesNoBadge({ value }: { value: boolean }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        value
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {value ? "YES" : "NO"}
    </span>
  );
}

function JudgeProofPanel({
  proof,
  loading,
  error,
}: {
  proof: BandLiveProof | null;
  loading: boolean;
  error: string;
}) {
  const isReal = proof?.band_mode === "real" && proof?.fallback_used === false;

  return (
    <section className="mb-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-slate-50 p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
            Judge Proof Panel
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Real Band Collaboration Evidence
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            This panel reads live proof from the backend Band endpoint and
            clearly separates real mode from demo fallback.
          </p>
        </div>

        <div
          className={`rounded-2xl px-5 py-3 text-center ${
            isReal ? "bg-emerald-600 text-white" : "bg-amber-500 text-white"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-widest">
            Band Mode
          </p>
          <p className="text-2xl font-black">
            {loading ? "CHECKING" : proof?.band_mode?.toUpperCase() || "UNKNOWN"}
          </p>
        </div>
      </div>

      {loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-600">
          Checking real Band proof...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {proof && (
        <>
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Fallback Used
              </p>
              <p className="mt-2 text-xl font-bold text-slate-950">
                {proof.fallback_used ? "YES" : "NO"}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Band Room ID
              </p>
              <p className="mt-2 break-all text-sm font-bold text-slate-950">
                {proof.band_room_id || "Not created"}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Messages Posted
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {proof.messages_posted}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Agents Collaborated
              </p>
              <p className="mt-2 text-2xl font-black text-slate-950">
                {proof.agents_collaborated}
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Context Retrieved
              </p>
              <div className="mt-2">
                <YesNoBadge value={proof.context_retrieved} />
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Human Escalation
              </p>
              <div className="mt-2">
                <YesNoBadge value={proof.human_escalation_triggered} />
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Final Decision From History
              </p>
              <div className="mt-2">
                <YesNoBadge
                  value={proof.final_decision_generated_from_band_history}
                />
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Audit Report Generated
              </p>
              <div className="mt-2">
                <YesNoBadge value={proof.audit_report_generated} />
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-100 bg-white p-5">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-700">
              Collaboration Checklist
            </h3>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Real Band room created",
                "8 agents posted structured findings",
                "Later agents used previous findings as shared context",
                "Human escalation triggered",
                "Final decision generated from Band history",
                "Audit report generated from collaboration trail",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {proof.demo_notice && (
              <p className="mt-4 rounded-xl bg-amber-50 p-3 text-sm text-amber-700">
                {proof.demo_notice}
              </p>
            )}

            {proof.proof_note && (
              <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">
                {proof.proof_note}
              </p>
            )}

            {proof.error && (
              <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {proof.error}
              </p>
            )}
          </div>
        </>
      )}
    </section>
  );
}


export default function BandRoomsPage() {
  const [workflowResult, setWorkflowResult] = useState<any>(null);
  const [running, setRunning] = useState(false);
  const [workflowError, setWorkflowError] = useState("");
  const [liveProof, setLiveProof] = useState<BandLiveProof | null>(null);
  const [proofLoading, setProofLoading] = useState(true);
  const [proofError, setProofError] = useState("");


  useEffect(() => {
    async function loadLiveProof() {
      setProofLoading(true);
      setProofError("");

      try {
        const data = await getBandLiveProof();
        setLiveProof(data);
      } catch (error) {
        setProofError(
          "Live Band proof failed. Check Render backend, Band API key, and /api/band/live-proof."
        );
      } finally {
        setProofLoading(false);
      }
    }

    loadLiveProof();
  }, []);

  async function handleRunWorkflow() {
    setRunning(true);
    setWorkflowError("");

    try {
      const data = await runGovernanceWorkflow();
      setWorkflowResult(data);
    } catch (error) {
      setWorkflowError(
        "Workflow run failed. Check backend server and NEXT_PUBLIC_API_URL."
      );
    } finally {
      setRunning(false);
    }
  }

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
          <button
            onClick={handleRunWorkflow}
            disabled={running}
            className="flex h-11 items-center gap-2 rounded-xl bg-teal-700 px-4 text-sm font-bold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {running ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <PlayCircle size={18} />
            )}
            {running ? "Running..." : "Run Live Band Workflow"}
          </button>

          <a
            href={getDownloadReportUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-900 hover:bg-slate-50"
          >
            <ArrowDownToLine size={18} />
            Download Report
          </a>

          <button className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <JudgeProofPanel
        proof={liveProof}
        loading={proofLoading}
        error={proofError}
      />

      {workflowError && (
        <section className="mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {workflowError}
        </section>
      )}

      {workflowResult && (
        <section className="mb-6 rounded-2xl border border-teal-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Server size={20} className="text-teal-700" />
                <h2 className="text-lg font-bold text-slate-950">
                  Live Band Workflow Result
                </h2>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Backend workflow completed and returned Band collaboration
                output.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                Mode: {workflowResult.band_mode}
              </span>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                Room: {workflowResult.band_room_id}
              </span>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                Decision: {workflowResult.final_decision?.decision}
              </span>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 2xl:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Final Risk
              </p>
              <p className="mt-2 text-xl font-bold text-red-600">
                {workflowResult.final_decision?.risk} ·{" "}
                {workflowResult.final_decision?.risk_score}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Safe Alternative
              </p>
              <p className="mt-2 font-bold text-slate-950">
                {workflowResult.final_decision?.safe_alternative}
              </p>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Judge Proof
              </p>
              <p className="mt-2 flex items-center gap-2 font-bold text-slate-950">
                <CheckCheck size={18} className="text-emerald-600" />
                Agents posted findings to Band workflow
              </p>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-3 font-bold text-slate-950">
              Live Agent Findings
            </h3>

            <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
              {workflowResult.agent_findings?.map((finding: any) => (
                <LiveFindingCard key={finding.agent} finding={finding} />
              ))}
            </div>
          </div>
        </section>
      )}

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
