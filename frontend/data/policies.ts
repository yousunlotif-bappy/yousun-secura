import {
  ClipboardCheck,
  ShieldAlert,
  FileCheck2,
  AlertTriangle,
  Database,
  LockKeyhole,
  DollarSign,
  Users,
  KeyRound,
  FileText,
  ShieldCheck,
  Activity,
} from "lucide-react";

export const policyStats = [
  {
    label: "Total Policies",
    value: "42",
    sub: "+4 this month",
    icon: ClipboardCheck,
    color: "blue",
  },
  {
    label: "Active Policies",
    value: "36",
    sub: "Currently enforced",
    icon: ShieldCheck,
    color: "green",
  },
  {
    label: "Policy Violations",
    value: "18",
    sub: "+6 this week",
    icon: ShieldAlert,
    color: "red",
  },
  {
    label: "Exceptions",
    value: "9",
    sub: "Human approved",
    icon: AlertTriangle,
    color: "amber",
  },
  {
    label: "Policy Match Rate",
    value: "98%",
    sub: "+2.6% this month",
    icon: Activity,
    color: "purple",
  },
];

export const policies = [
  {
    id: "DP-03",
    name: "Data Export Policy",
    category: "Data Protection",
    owner: "Data Protection Team",
    version: "v2.1",
    status: "Active",
    risk: "High",
    icon: Database,
    lastUpdated: "May 1, 2025",
    description:
      "Controls export of customer, employee, and confidential business data from enterprise systems.",
    violations: 7,
    exceptions: 3,
  },
  {
    id: "AC-01",
    name: "Access Control Policy",
    category: "Identity & Access",
    owner: "Security Ops",
    version: "v3.0",
    status: "Active",
    risk: "High",
    icon: LockKeyhole,
    lastUpdated: "Apr 20, 2025",
    description:
      "Defines role-based access control rules for sensitive systems, data, and privileged actions.",
    violations: 5,
    exceptions: 2,
  },
  {
    id: "FA-02",
    name: "Financial Approval Policy",
    category: "Finance",
    owner: "Finance Operations",
    version: "v1.8",
    status: "Active",
    risk: "Medium",
    icon: DollarSign,
    lastUpdated: "Apr 18, 2025",
    description:
      "Controls refund approvals, payment changes, and financial actions above defined thresholds.",
    violations: 2,
    exceptions: 1,
  },
  {
    id: "HR-04",
    name: "Employee Data Access Policy",
    category: "Human Resources",
    owner: "HR Governance",
    version: "v2.4",
    status: "Active",
    risk: "Medium",
    icon: Users,
    lastUpdated: "Apr 12, 2025",
    description:
      "Restricts employee payroll, salary, performance, and personal data access.",
    violations: 1,
    exceptions: 1,
  },
  {
    id: "API-07",
    name: "Production API Key Policy",
    category: "Engineering",
    owner: "Platform Security",
    version: "v1.5",
    status: "Draft",
    risk: "Medium",
    icon: KeyRound,
    lastUpdated: "Mar 28, 2025",
    description:
      "Defines approval and logging requirements for access to production API keys and secrets.",
    violations: 0,
    exceptions: 0,
  },
  {
    id: "REP-06",
    name: "Confidential Report Policy",
    category: "Reporting",
    owner: "Executive Office",
    version: "v1.2",
    status: "Active",
    risk: "High",
    icon: FileText,
    lastUpdated: "Mar 15, 2025",
    description:
      "Controls access to confidential strategy, board, finance, and executive reports.",
    violations: 3,
    exceptions: 2,
  },
];

export const selectedPolicyRules = [
  {
    title: "Raw customer data export is restricted",
    detail:
      "Customer emails, names, IDs, and PII cannot be exported directly by low-privilege roles.",
    severity: "High",
  },
  {
    title: "Anonymized export is allowed",
    detail:
      "Aggregated or anonymized audience segments can be used instead of raw customer records.",
    severity: "Medium",
  },
  {
    title: "Exports above 1,000 records require approval",
    detail:
      "Manager approval and security review are required for large-scale exports.",
    severity: "High",
  },
  {
    title: "All export decisions must be logged",
    detail:
      "Every approval, rejection, exception, and agent recommendation must be recorded in audit trail.",
    severity: "Medium",
  },
];

export const recentViolations = [
  {
    request: "Export customer emails for campaign",
    requester: "Marketing Intern",
    risk: "High",
    decision: "Rejected",
  },
  {
    request: "Access customer PII dataset",
    requester: "Data Scientist",
    risk: "High",
    decision: "Escalated",
  },
  {
    request: "Download confidential report",
    requester: "Data Analyst",
    risk: "High",
    decision: "Rejected",
  },
];

export const policySimulation = {
  request: "Marketing Intern wants to export 50,000 customer emails",
  matchedPolicy: "DP-03 Data Export Policy",
  result: "Violation Detected",
  recommendation: "Reject raw export and recommend anonymized audience report.",
};



