import AppShell from "@/components/AppShell";
import { users, roleCards } from "@/data/settings";
import { Plus, Search, MoreHorizontal, ShieldCheck } from "lucide-react";

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active: "bg-emerald-50 text-emerald-600",
    Service: "bg-blue-50 text-blue-600",
    Disabled: "bg-red-50 text-red-600",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${styles[status]}`}>
      {status}
    </span>
  );
}

export default function UsersRolesPage() {
  return (
    <AppShell>
      <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Users & Roles</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage reviewers, approvers, administrators, and service agents.
          </p>
        </div>

        <button className="flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white hover:bg-slate-800">
          <Plus size={18} />
          Invite User
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
        {roleCards.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.role} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                  <Icon size={23} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-950">{item.role}</h2>
                  <p className="text-sm font-bold text-slate-700">{item.users} users</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.permissions}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Enterprise Users</h2>
            <p className="text-sm text-slate-500">
              Role-based access controls for approval and governance workflows.
            </p>
          </div>

          <div className="relative">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search users..."
              className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 xl:w-80"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Department</th>
                <th className="px-5 py-4">Access</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.email} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
                        {user.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-slate-950">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 font-semibold text-slate-800">{user.role}</td>
                  <td className="px-5 py-4 text-slate-600">{user.department}</td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                      <ShieldCheck size={14} />
                      {user.access}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-5 py-4">
                    <button className="rounded-lg p-2 hover:bg-slate-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}



