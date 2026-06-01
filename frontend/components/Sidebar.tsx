"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  MessageSquareText,
  CheckCircle2,
  ScrollText,
  ClipboardCheck,
  BarChart3,
  Bot,
  Activity,
  Gauge,
  Plug,
  Users,
  Settings,
} from "lucide-react";

const mainNav = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Requests", href: "/requests", icon: FileText },
  { label: "Band Rooms", href: "/band-rooms", icon: MessageSquareText },
  { label: "Approvals", href: "/approvals", icon: CheckCircle2 },
  { label: "Audit Trail", href: "/audit-trail", icon: ScrollText },
  { label: "Policies", href: "/policies", icon: ClipboardCheck },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

const agentNav = [
  { label: "Agent Overview", href: "/agent-overview", icon: Bot },
  { label: "Active Agents", href: "/active-agents", icon: Activity },
  { label: "Agent Performance", href: "/agent-performance", icon: Gauge },
];

const settingsNav = [
  { label: "Integrations", href: "/integrations", icon: Plug },
  { label: "Users & Roles", href: "/users-roles", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 px-2">
      <Image
        src="/Secura.png"
        alt="YOUSUN Secura Logo"
        width={90}
        height={90}
        className="h-12 w-12 object-contain"
        priority
      />

      <div>
        <p className="text-xs font-semibold tracking-[0.45em] text-teal-300">
          YOUSUN
        </p>
        <p className="text-xl font-bold tracking-[0.22em] text-white">
          SECURA
        </p>
      </div>
    </Link>
  );
}

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
}) {
  const pathname = usePathname();

  return (
    <div className="mt-8">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-teal-300">
        {title}
      </p>

      <div className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-teal-600/70 text-white shadow-lg shadow-teal-950/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 h-screen w-72 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 text-white">
      <Logo />

      <NavGroup title="Main" items={mainNav} />
      <NavGroup title="Agent Network" items={agentNav} />
      <NavGroup title="Settings" items={settingsNav} />

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
        <p className="font-semibold text-white">Need Help?</p>
        <p className="mt-1 text-sm text-slate-300">
          Contact support for governance workflow assistance.
        </p>
        <button className="mt-4 rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">
          Contact Support
        </button>
      </div>
    </aside>
  );
}


