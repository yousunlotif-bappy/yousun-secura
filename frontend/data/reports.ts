import {
  FileText,
  Download,
  Clock3,
  CalendarClock,
  ShieldCheck,
  ScrollText,
  Activity,
  BarChart3,
  Users,
  Database,
  ClipboardCheck,
  LockKeyhole,
  ShieldAlert,
  FileCheck2,
} from "lucide-react";

export const reportStats = [
  {
    label: "Reports Generated",
    value: "86",
    sub: "+16% this week",
    icon: FileText,
    color: "blue",
  },
  {
    label: "Downloaded",
    value: "52",
    sub: "+11% this week",
    icon: Download,
    color: "green",
  },
  {
    label: "Scheduled",
    value: "14",
    sub: "Active schedules",
    icon: CalendarClock,
    color: "purple",
  },
  {
    label: "Audit Ready",
    value: "39",
    sub: "Evidence attached",
    icon: ShieldCheck,
    color: "emerald",
  },
  {
    label: "Pending Review",
    value: "7",
    sub: "Needs approval",
    icon: Clock3,
    color: "amber",
  },
];

export const reportCards = [
  {
    title: "Risk Summary Report",
    description:
      "Overview of high-risk requests, rejected actions, escalations, and agent recommendations.",
    type: "Risk",
    icon: ShieldAlert,
    generated: "May 14, 2025",
    status: "Ready",
  },
  {
    title: "Audit Trail Report",
    description:
      "Complete evidence trail for requests, policy checks, approvals, and final decisions.",
    type: "Audit",
    icon: ScrollText,
    generated: "May 14, 2025",
    status: "Ready",
  },
  {
    title: "Access Review Report",
    description:
      "Summary of role checks, permission failures, access exceptions, and human approvals.",
    type: "Access",
    icon: LockKeyhole,
    generated: "May 13, 2025",
    status: "Ready",
  },
  {
    title: "Agent Performance Report",
    description:
      "Agent completion rate, response time, policy match rate, and escalation performance.",
    type: "AgentOps",
    icon: Activity,
    generated: "May 13, 2025",
    status: "Ready",
  },
];

export const recentReports = [
  {
    id: "REP-2025-0086",
    name: "Customer Data Export Audit Report",
    category: "Audit",
    owner: "Security Manager",
    created: "May 14, 2025 10:25 AM",
    size: "1.2 MB",
    status: "Ready",
    icon: FileCheck2,
  },
  {
    id: "REP-2025-0085",
    name: "Weekly Risk Summary",
    category: "Risk",
    owner: "Risk Agent",
    created: "May 14, 2025 09:00 AM",
    size: "840 KB",
    status: "Ready",
    icon: BarChart3,
  },
  {
    id: "REP-2025-0084",
    name: "Access Review Findings",
    category: "Access Review",
    owner: "Permission Agent",
    created: "May 13, 2025 05:30 PM",
    size: "970 KB",
    status: "Ready",
    icon: LockKeyhole,
  },
  {
    id: "REP-2025-0083",
    name: "Policy Violation Summary",
    category: "Policy",
    owner: "Policy Review Agent",
    created: "May 13, 2025 03:15 PM",
    size: "760 KB",
    status: "Ready",
    icon: ClipboardCheck,
  },
  {
    id: "REP-2025-0082",
    name: "Human Approval Queue Report",
    category: "Approval",
    owner: "Human Escalation Agent",
    created: "May 13, 2025 01:40 PM",
    size: "690 KB",
    status: "Review",
    icon: Users,
  },
  {
    id: "REP-2025-0081",
    name: "Sensitive Data Activity Report",
    category: "Data",
    owner: "Data Sensitivity Agent",
    created: "May 12, 2025 06:20 PM",
    size: "1.4 MB",
    status: "Ready",
    icon: Database,
  },
];

export const reportBuilder = [
  {
    label: "Report Type",
    value: "Audit Evidence Report",
  },
  {
    label: "Date Range",
    value: "Last 7 days",
  },
  {
    label: "Risk Level",
    value: "High + Medium",
  },
  {
    label: "Include",
    value: "Agent messages, decisions, evidence",
  },
];

export const reportPreview = {
  title: "Customer Data Export Audit Report",
  requestId: "BR-2025-05-1287",
  decision: "Rejected",
  riskScore: "85/100",
  policy: "DP-03 Data Export Policy",
  safeAlternative: "Anonymized audience report",
  evidenceItems: "7 verification checks",
};



