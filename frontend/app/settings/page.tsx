import AppShell from "@/components/AppShell";
import { securitySettings } from "@/data/settings";
import { Save, ShieldCheck, Bell, Database, LockKeyhole } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Settings</h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure security, approvals, reports, and governance behavior.
          </p>
        </div>

        <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-12">
        <section className="space-y-6 2xl:col-span-8">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                <ShieldCheck size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Governance Rules
                </h2>
                <p className="text-sm text-slate-500">
                  Default rules applied to all sensitive enterprise actions.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {securitySettings.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-teal-700">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="font-bold text-slate-950">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <button
                      className={`h-8 w-14 rounded-full p-1 ${
                        item.enabled ? "bg-teal-700" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white transition ${
                          item.enabled ? "ml-6" : "ml-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-950">
              Report & Evidence Settings
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["Default report format", "PDF + JSON evidence"],
                ["Evidence retention", "365 days"],
                ["Scheduled reports", "Every Monday 9:00 AM"],
                ["Audit package storage", "Encrypted cloud vault"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-1 font-bold text-slate-950">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6 2xl:col-span-4">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 text-blue-600">
                <Bell size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Notification Rules
                </h2>
                <p className="text-sm text-slate-500">Alert routing.</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "Notify manager on high risk",
                "Notify DPO on PII request",
                "Notify security on policy violation",
                "Send daily summary report",
              ].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    On
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Database size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Data Controls
                </h2>
                <p className="text-sm text-slate-500">Sensitivity defaults.</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">PII export</span>
                <b className="text-red-600">Blocked</b>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Sensitive access</span>
                <b className="text-amber-600">Approval required</b>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Audit logging</span>
                <b className="text-emerald-600">Enabled</b>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Encryption</span>
                <b className="text-slate-900">AES-256</b>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-600">
                <LockKeyhole size={23} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Security Posture
                </h2>
                <p className="text-sm text-slate-500">Current platform state.</p>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-sm font-bold text-emerald-700">
                Enterprise Ready
              </p>
              <p className="mt-1 text-sm text-slate-600">
                High-risk approval, audit evidence, policy simulation, and role-based governance are enabled.
              </p>
            </div>
          </section>
        </aside>
      </div>
    </AppShell>
  );
}


