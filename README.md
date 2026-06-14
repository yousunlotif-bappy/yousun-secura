# YOUSUN Secura

## Multi-Agent Governance Command Center for Enterprise AI Workflows

**YOUSUN Secura** is a Band-ready multi-agent governance platform that reviews sensitive enterprise actions before execution.

It helps organizations safely approve, reject, escalate, and audit high-risk actions using multiple specialist AI agents working together through a shared collaboration workflow.

> **Tagline:** Secure every enterprise action before it happens.

---

## Live Links

- **Live Demo:** https://yousun-secura.vercel.app/
- **Backend API:** https://yousun-secura.onrender.com/
- **API Docs:** https://yousun-secura.onrender.com/docs
- **GitHub Repo:** https://github.com/yousunlotif-bappy/yousun-secura

---

## Built For

**Band of Agents Hackathon**

Challenge: **Build a Cross-Framework Multi-Agent System with Band**

The goal of the challenge is to build a multi-agent system where at least 3 agents collaborate through Band across planning, execution, review, decision-making, or task handoff.

YOUSUN Secura is designed around that exact requirement.

---

## Problem

AI agents are becoming powerful enough to handle real enterprise work.

They can help with:

- data access
- customer support
- financial approvals
- reporting
- HR workflows
- compliance checks
- internal operations
- software and API access

But sensitive enterprise actions cannot be executed blindly.

A single employee, automation, or AI agent should not independently:

- export customer data
- approve large refunds
- access confidential reports
- update vendor bank details
- access employee salary data
- request production API keys
- handle regulated data without review

Without governance, companies can face:

- data leakage
- policy violations
- financial loss
- compliance failure
- lack of accountability
- missing audit evidence

---

## Solution

YOUSUN Secura creates a shared governance workflow for every sensitive action.

When a high-risk request enters the system, YOUSUN Secura routes it through a multi-agent review process.

Specialist agents collaborate to check:

- policy rules
- user permissions
- data sensitivity
- security risk
- approval requirements
- final decision logic
- audit evidence

The final output is a clear governance decision:

- Approve
- Reject
- Escalate to human
- Approve with conditions
- Recommend a safer alternative

Every decision is recorded in the audit trail and can be downloaded as an audit-ready report.

---

## Core Demo Scenario

A **Marketing Intern** requests permission to export **50,000 customer emails** for a campaign.

This is risky because it involves:

- customer personal data
- large-scale data export
- low-privilege requester
- policy restrictions
- possible compliance exposure

YOUSUN Secura creates a Band-style governance room where agents review the request before any action happens.

Final decision:

```txt
Decision: Rejected
Risk Level: High
Risk Score: 85/100
Reason: Role mismatch + sensitive PII + DP-03 policy restriction
Safe Alternative: Provide anonymized audience report
Audit Ready: Yes
```

---

## Multi-Agent Workflow

YOUSUN Secura uses 8 specialist agents:

| Agent | Responsibility |
|---|---|
| Request Intake Agent | Captures and normalizes incoming enterprise requests |
| Policy Review Agent | Matches the request against governance policies |
| Permission Agent | Checks requester role, department, and access scope |
| Data Sensitivity Agent | Classifies sensitive data such as PII, financial, HR, or confidential data |
| Security Risk Agent | Generates risk score and risk explanation |
| Human Escalation Agent | Routes high-risk actions to managers, security, or compliance reviewers |
| Final Decision Agent | Combines agent findings into final approve/reject/escalate decision |
| Audit Evidence Agent | Creates audit trail and downloadable evidence report |

---

## Full Workflow

```txt
Sensitive Request Submitted
        ↓
Request Intake Agent structures the request
        ↓
Band Room / Collaboration Room is created
        ↓
Policy Review Agent checks company rules
        ↓
Permission Agent checks user access
        ↓
Data Sensitivity Agent classifies data
        ↓
Security Risk Agent generates risk score
        ↓
Human Escalation Agent routes approval if needed
        ↓
Final Decision Agent issues decision
        ↓
Audit Evidence Agent generates report
        ↓
Decision + Audit Trail + Downloadable Report
```

---

## Band-Ready Collaboration Layer

YOUSUN Secura is designed so **Band is the collaboration layer**, not only a final notification channel.

In the workflow:

- a governance room is created for the sensitive request
- agents post structured findings into the shared room
- later agents use earlier findings as context
- risky decisions are handed off to human reviewers
- the final decision is generated from the shared review trail
- audit evidence includes the collaboration history

The project includes a **Band-ready backend integration layer**.

Current implementation supports:

- Band status endpoint
- Band-ready client service
- Band-ready governance workflow service
- fallback demo mode when credentials are not configured
- live workflow button in frontend
- backend workflow response with Band Room ID, agent findings, and judge proof

When real Band credentials are configured, the same workflow can post agent findings into a real Band room.

---

## Key Feature: Live Band Workflow Button

The Band Room page includes:

```txt
Run Live Band Workflow
```

When clicked, it calls:

```txt
POST /api/run-governance-workflow
```

The backend returns:

- Band mode: `demo` or `real`
- Band Room ID
- agent findings
- final decision
- judge proof flags

Example response includes:

```json
{
  "band_mode": "demo",
  "band_room_id": "demo-band-room-BR-2025-05-1287",
  "final_decision": {
    "decision": "Rejected",
    "risk": "High",
    "risk_score": "85/100",
    "audit_ready": true
  },
  "judge_proof": {
    "band_is_core_layer": true,
    "agents_posted_to_band_room": true,
    "decision_generated_from_agent_findings": true,
    "audit_report_uses_room_history": true
  }
}
```

This proves the workflow is not just static UI. It can trigger the governance pipeline from the frontend.

---

## Main Pages

### Dashboard

Shows the overall governance status:

- total requests
- pending reviews
- high-risk actions
- approved and rejected decisions
- active Band Room
- agent status
- decision summary

### Requests

Manages sensitive enterprise requests:

- request table
- risk level
- status
- requester details
- data involved
- approve / reject / escalate actions
- enter Band Room
- download report

### Band Rooms

Core collaboration page:

- agent discussion
- workflow progress
- room details
- risk context
- related documents
- live backend workflow trigger
- live agent findings
- final decision summary

### Approvals

Human-in-the-loop review:

- pending approvals
- high-priority approvals
- due soon / SLA
- approval path
- approve / reject / escalate actions

### Audit Trail

Traceability and compliance:

- audit events
- verification summary
- timeline
- linked documents
- evidence package
- downloadable audit report

### Policies

Policy engine:

- policy library
- policy rules
- recent violations
- policy simulation
- policy match explanation

### Reports

Enterprise outputs:

- generated reports
- report preview
- custom report builder
- download report buttons
- audit-ready package

### Agent Network

Shows the multi-agent system:

- Agent Overview
- Active Agents
- Agent Performance

### Enterprise Setup

Supporting SaaS pages:

- Integrations
- Users & Roles
- Settings

---

## Architecture

```txt
┌────────────────────────────────────────────┐
│              Frontend Layer                │
│        Next.js + TypeScript + Tailwind      │
│                                            │
│ Dashboard | Requests | Band Room | Reports │
│ Approvals | Audit Trail | Policies | Agents│
└─────────────────────┬──────────────────────┘
                      │
                      │ REST API
                      ↓
┌────────────────────────────────────────────┐
│              Backend API Layer             │
│                  FastAPI                   │
│                                            │
│ Requests API                               │
│ Agents API                                 │
│ Band Room API                              │
│ Audit Trail API                            │
│ Policy API                                 │
│ Reports API                                │
│ Governance Workflow API                    │
└─────────────────────┬──────────────────────┘
                      │
                      ↓
┌────────────────────────────────────────────┐
│        Multi-Agent Governance Layer        │
│                                            │
│ Request Intake Agent                       │
│ Policy Review Agent                        │
│ Permission Agent                           │
│ Data Sensitivity Agent                     │
│ Security Risk Agent                        │
│ Human Escalation Agent                     │
│ Final Decision Agent                       │
│ Audit Evidence Agent                       │
└─────────────────────┬──────────────────────┘
                      │
                      ↓
┌────────────────────────────────────────────┐
│           Band Collaboration Layer         │
│                                            │
│ Shared room                                │
│ Agent messages                             │
│ Context handoff                            │
│ Human escalation                           │
│ Decision history                           │
└─────────────────────┬──────────────────────┘
                      │
                      ↓
┌────────────────────────────────────────────┐
│             Governance Output Layer        │
│                                            │
│ Final decision                             │
│ Audit trail                                │
│ Evidence package                           │
│ Downloadable report                        │
└────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS
- lucide-react
- Vercel deployment

### Backend

- FastAPI
- Python
- httpx
- python-dotenv
- Render deployment

### Architecture Style

- Monorepo
- Frontend + backend separated
- REST API communication
- Band-ready integration layer
- Demo fallback mode for safe deployment

---

## Backend API Endpoints

```txt
GET  /
GET  /api/requests
GET  /api/agents
GET  /api/band-room
GET  /api/audit-trail
GET  /api/policies
GET  /api/reports
GET  /api/band/status
GET  /api/download-report
POST /api/run-governance-workflow
```

### Most Important Endpoint

```txt
POST /api/run-governance-workflow
```

This runs the Band-ready governance workflow and returns agent findings, Band room information, final decision, and judge proof.

---

## Environment Variables

Backend `.env.example`:

```env
BAND_REST_URL=https://app.band.ai/api/v1/agent

BAND_AGENT_API_KEY=your_band_agent_api_key_here
BAND_AGENT_ID=your_band_agent_uuid_here

BAND_POLICY_AGENT_API_KEY=
BAND_PERMISSION_AGENT_API_KEY=
BAND_RISK_AGENT_API_KEY=
BAND_AUDIT_AGENT_API_KEY=

BAND_ENABLE_REAL_API=true
```

Frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://yousun-secura.onrender.com
```

For local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/yousunlotif-bappy/yousun-secura.git
cd yousun-secura
```

### 2. Run Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend runs at:

```txt
http://localhost:8000
```

API docs:

```txt
http://localhost:8000/docs
```

Test:

```txt
http://localhost:8000/api/band/status
```

### 3. Run Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```txt
http://localhost:3000
```

---

## Deployment

### Backend on Render

Recommended settings:

```txt
Root Directory: backend
Environment: Python
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Required environment variables on Render:

```env
BAND_REST_URL=https://app.band.ai/api/v1/agent
BAND_ENABLE_REAL_API=false
```

When real Band credentials are available:

```env
BAND_AGENT_API_KEY=your_real_key
BAND_AGENT_ID=your_real_agent_id
BAND_ENABLE_REAL_API=true
```

### Frontend on Vercel

Recommended settings:

```txt
Framework Preset: Next.js
Root Directory: frontend
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

Required environment variable on Vercel:

```env
NEXT_PUBLIC_API_URL=https://yousun-secura.onrender.com
```

---

## Hackathon Alignment

YOUSUN Secura satisfies the challenge requirements:

| Requirement | How YOUSUN Secura Meets It |
|---|---|
| At least 3 agents | Uses 8 specialist agents |
| Agent collaboration | Agents share findings in a Band-style governance room |
| Structured context | Each agent outputs structured finding, status, and decision context |
| Task handoff | Intake → policy → permission → data → risk → human escalation → decision → audit |
| Decision-making | Final Decision Agent combines findings |
| Human review | Human Escalation Agent routes high-risk actions |
| Auditability | Audit Evidence Agent generates report |
| Enterprise use case | Regulated high-stakes governance workflow |

Best fit track:

```txt
Track 3: Regulated & High-Stakes Workflows
```

Also fits:

```txt
Track 1: Internal Enterprise Workflows
```

---

## Why This Project Matters

YOUSUN Secura helps enterprises:

- prevent unsafe AI actions
- reduce data leakage risk
- enforce governance policies
- control sensitive access requests
- support human approvals
- create audit-ready evidence
- improve accountability
- build trust in autonomous workflows

---

## Demo Flow for Judges

Recommended demo order:

```txt
1. Dashboard
2. Requests
3. Band Rooms
4. Click "Run Live Band Workflow"
5. Approvals
6. Audit Trail
7. Policies
8. Reports
9. FastAPI Docs
```

Focus most time on:

```txt
Band Rooms
Approvals
Audit Trail
Reports
```

---

## Judge-Focused Explanation

YOUSUN Secura uses Band as the collaboration layer for enterprise governance.

When a sensitive request enters the system, a shared review room is created. Specialist agents post structured findings, hand off context, trigger human review, and generate a final decision. The audit report is built from the review trail, making the workflow traceable, accountable, and enterprise-ready.

---

## Current Status

- Frontend completed
- Backend completed
- Deployed frontend
- Deployed backend
- Band-ready backend client added
- Live workflow trigger added
- Downloadable report endpoint added
- README, pitch, demo script, and presentation prepared

---

## Future Improvements

- Enable real Band credentials in production
- Add WebSocket listener for real-time Band room events
- Store requests and audit records in PostgreSQL
- Add authentication and role-based login
- Add real PDF generation
- Add configurable policy editor
- Add actual human approval email/Slack routing
- Add real enterprise integrations such as SIEM, Google Workspace, and cloud storage

---

## Final Pitch

**YOUSUN Secura is a Band-ready multi-agent governance command center that reviews sensitive enterprise actions for policy, permission, data sensitivity, security risk, human approval, and audit readiness before execution.**

**Secure every enterprise action before it happens.**


