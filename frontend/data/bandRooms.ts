import {
  FileText,
  ShieldCheck,
  UserCheck,
  LockKeyhole,
  ShieldAlert,
  ClipboardCheck,
  Users,
  ScrollText,
  Gavel,
  Download,
} from "lucide-react";

export const bandRoom = {
  id: "BR-2025-05-1287",
  title: "Export customer emails for campaign",
  requester: "Marketing Intern",
  created: "Just now",
  department: "Marketing",
  dataInvolved: "Customer Email Data",
  businessPurpose: "Campaign Analysis",
  riskLevel: "High",
  priority: "High",
  sla: "23h 45m left",
};

export const discussionMessages = [
  {
    agent: "Request Intake Agent",
    initials: "RI",
    time: "10:24 AM",
    message:
      "Request received from Marketing Intern to export 50,000 customer emails for campaign analysis.",
    tone: "teal",
  },
  {
    agent: "Policy Review Agent",
    initials: "PR",
    time: "10:25 AM",
    message:
      "Company policy DP-03 restricts export of raw customer email data. Only anonymized or aggregated data is allowed.",
    tone: "amber",
  },
  {
    agent: "Permission Agent",
    initials: "PA",
    time: "10:26 AM",
    message:
      "Marketing Intern role does not have permission to export customer email data. Approval from Marketing Manager or higher is required.",
    tone: "purple",
  },
  {
    agent: "Data Sensitivity Agent",
    initials: "DS",
    time: "10:27 AM",
    message:
      "Customer emails contain PII. Data sensitivity level is High. Raw export creates privacy and compliance exposure.",
    tone: "blue",
  },
  {
    agent: "Security Risk Agent",
    initials: "SR",
    time: "10:28 AM",
    message:
      "High risk of data breach and misuse if exported in raw format. Risk score: 85/100. Recommend rejection or human escalation.",
    tone: "red",
  },
  {
    agent: "Human Escalation Agent",
    initials: "HE",
    time: "10:29 AM",
    message:
      "Escalation required to Marketing Manager and Data Protection Officer if business exception is requested.",
    tone: "orange",
  },
];

export const agentStatuses = [
  {
    agent: "Request Intake Agent",
    initials: "RI",
    status: "Completed",
    icon: FileText,
  },
  {
    agent: "Policy Review Agent",
    initials: "PR",
    status: "Completed",
    icon: ClipboardCheck,
  },
  {
    agent: "Permission Agent",
    initials: "PA",
    status: "Completed",
    icon: UserCheck,
  },
  {
    agent: "Data Sensitivity Agent",
    initials: "DS",
    status: "Completed",
    icon: LockKeyhole,
  },
  {
    agent: "Security Risk Agent",
    initials: "SR",
    status: "Completed",
    icon: ShieldAlert,
  },
  {
    agent: "Audit Evidence Agent",
    initials: "AE",
    status: "In Progress",
    icon: ScrollText,
  },
  {
    agent: "Human Escalation Agent",
    initials: "HE",
    status: "In Progress",
    icon: Users,
  },
  {
    agent: "Final Decision Agent",
    initials: "FD",
    status: "Pending",
    icon: Gavel,
  },
];

export const workflowSteps = [
  {
    title: "Request Received",
    status: "Completed",
  },
  {
    title: "Policy & Permission Review",
    status: "Completed",
  },
  {
    title: "Data & Risk Analysis",
    status: "Completed",
  },
  {
    title: "Human Escalation",
    status: "In Progress",
  },
  {
    title: "Final Decision",
    status: "Pending",
  },
  {
    title: "Audit & Report Generation",
    status: "Pending",
  },
];

export const relatedDocuments = [
  {
    title: "DP-03 - Data Export Policy",
    type: "PDF",
    icon: Download,
  },
  {
    title: "Customer Data Classification",
    type: "PDF",
    icon: Download,
  },
  {
    title: "Access Control Policy",
    type: "PDF",
    icon: Download,
  },
];

export const tabs = ["Discussion", "Analysis", "Evidence", "Decision", "Activity Log"];


