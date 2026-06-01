import {
  MessageSquareText,
  GitBranch,
  Database,
  KeyRound,
  ShieldCheck,
  Users,
  Bell,
  LockKeyhole,
  Webhook,
  Activity,
  Mail,
  Cloud,
  UserCheck,
  Settings2,
} from "lucide-react";

export const integrations = [
  {
    name: "Band",
    type: "Agent Collaboration",
    status: "Connected",
    description:
      "Shared collaboration layer for multi-agent rooms and context handoff.",
    icon: Webhook,
  },
  {
    name: "Codeband",
    type: "Coding Workflow",
    status: "Connected",
    description:
      "Reference workflow for agent planning, review, and implementation handoff.",
    icon: GitBranch,
  },
  {
    name: "Slack",
    type: "Team Alerts",
    status: "Connected",
    description:
      "Send approval notifications and escalation alerts to security channels.",
    icon: MessageSquareText,
  },
  {
    name: "Google Workspace",
    type: "Identity",
    status: "Connected",
    description:
      "Sync users, roles, departments, and approval managers.",
    icon: Users,
  },
  {
    name: "SIEM / Security Logs",
    type: "Security Monitoring",
    status: "Pending",
    description:
      "Forward high-risk security events and audit logs.",
    icon: ShieldCheck,
  },
  {
    name: "Enterprise Data Warehouse",
    type: "Data Source",
    status: "Pending",
    description:
      "Connect governed datasets for data sensitivity checks.",
    icon: Database,
  },
  {
    name: "Email Gateway",
    type: "Notifications",
    status: "Connected",
    description:
      "Send scheduled reports, approval requests, and audit summaries.",
    icon: Mail,
  },
  {
    name: "Cloud Storage",
    type: "Evidence Storage",
    status: "Pending",
    description:
      "Store audit evidence packages and generated reports.",
    icon: Cloud,
  },
];

export const integrationStats = [
  {
    label: "Connected Apps",
    value: "5",
    icon: Activity,
  },
  {
    label: "Pending Setup",
    value: "3",
    icon: Settings2,
  },
  {
    label: "Webhook Events",
    value: "1,248",
    icon: Webhook,
  },
  {
    label: "Secure Tokens",
    value: "12",
    icon: KeyRound,
  },
];

export const users = [
  {
    name: "Arif Hasan",
    email: "arif.hasan@enterprise.com",
    role: "Security Manager",
    department: "Security",
    status: "Active",
    access: "Admin",
  },
  {
    name: "Nadia Rahman",
    email: "nadia.rahman@enterprise.com",
    role: "Data Protection Officer",
    department: "Compliance",
    status: "Active",
    access: "Reviewer",
  },
  {
    name: "Fahim Ahmed",
    email: "fahim.ahmed@enterprise.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "Active",
    access: "Approver",
  },
  {
    name: "Rafi Khan",
    email: "rafi.khan@enterprise.com",
    role: "Finance Lead",
    department: "Finance",
    status: "Active",
    access: "Approver",
  },
  {
    name: "Sara Karim",
    email: "sara.karim@enterprise.com",
    role: "HR Manager",
    department: "HR",
    status: "Active",
    access: "Reviewer",
  },
  {
    name: "DevOps Agent",
    email: "devops.agent@enterprise.com",
    role: "System Agent",
    department: "Engineering",
    status: "Service",
    access: "Limited",
  },
];

export const roleCards = [
  {
    role: "Admin",
    users: 2,
    permissions: "Full system configuration and policy control",
    icon: ShieldCheck,
  },
  {
    role: "Reviewer",
    users: 8,
    permissions: "Review high-risk requests and policy evidence",
    icon: UserCheck,
  },
  {
    role: "Approver",
    users: 12,
    permissions: "Approve or reject department-level requests",
    icon: Users,
  },
  {
    role: "Limited",
    users: 18,
    permissions: "Submit requests and view own activity",
    icon: LockKeyhole,
  },
];

export const securitySettings = [
  {
    title: "Require human approval for high-risk actions",
    description:
      "High-risk actions cannot be finalized without human approval.",
    enabled: true,
    icon: ShieldCheck,
  },
  {
    title: "Enable audit evidence package",
    description:
      "Automatically generate evidence logs for every final decision.",
    enabled: true,
    icon: Database,
  },
  {
    title: "Notify managers on SLA risk",
    description:
      "Send alerts when approval deadlines are close.",
    enabled: true,
    icon: Bell,
  },
  {
    title: "Block raw PII export by default",
    description:
      "Prevent direct export of sensitive customer or employee data.",
    enabled: true,
    icon: LockKeyhole,
  },
];