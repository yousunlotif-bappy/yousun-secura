import {
  FileText,
  Clock3,
  ShieldAlert,
  ShieldCheck,
  XCircle,
  Users,
  DollarSign,
  User,
  Building2,
  Download,
} from "lucide-react";

export const stats = [
  {
    label: "Total Requests",
    value: "128",
    sub: "+18 this week",
    icon: FileText,
    color: "blue",
  },
  {
    label: "Pending Review",
    value: "23",
    sub: "Requires attention",
    icon: Clock3,
    color: "amber",
  },
  {
    label: "High Risk",
    value: "7",
    sub: "Needs escalation",
    icon: ShieldAlert,
    color: "red",
  },
  {
    label: "Approved",
    value: "63",
    sub: "+12 this week",
    icon: ShieldCheck,
    color: "green",
  },
  {
    label: "Rejected",
    value: "35",
    sub: "+8 this week",
    icon: XCircle,
    color: "red",
  },
];

export const recentRequests = [
  {
    title: "Export customer emails for campaign",
    requester: "Marketing Intern",
    risk: "High Risk",
    time: "Just now",
    icon: Users,
    color: "red",
  },
  {
    title: "Approve refund of $4,500",
    requester: "Refund Agent",
    risk: "Medium Risk",
    time: "5m ago",
    icon: DollarSign,
    color: "amber",
  },
  {
    title: "Access employee salary data",
    requester: "HR Executive",
    risk: "Medium Risk",
    time: "15m ago",
    icon: User,
    color: "purple",
  },
  {
    title: "Update vendor bank details",
    requester: "Finance Bot",
    risk: "Low Risk",
    time: "30m ago",
    icon: Building2,
    color: "green",
  },
  {
    title: "Download confidential report",
    requester: "Data Analyst",
    risk: "High Risk",
    time: "45m ago",
    icon: Download,
    color: "blue",
  },
];

export const agents = [
  "Request Intake Agent",
  "Policy Review Agent",
  "Permission Agent",
  "Data Sensitivity Agent",
  "Security Risk Agent",
  "Audit Evidence Agent",
  "Human Escalation Agent",
  "Final Decision Agent",
];

export const roomActivity = [
  {
    agent: "Policy Review Agent",
    message: "Raw customer email export is restricted by policy DP-03.",
  },
  {
    agent: "Permission Agent",
    message: "Requester role does not have permission for this action.",
  },
  {
    agent: "Data Sensitivity Agent",
    message: "Customer emails contain PII data. Sensitivity: High.",
  },
];


