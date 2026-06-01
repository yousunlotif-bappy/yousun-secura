from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response

from app.services.band_client import get_band_client
from app.services.governance_workflow import run_band_governance_workflow


app = FastAPI(
    title="YOUSUN Secura API",
    description="Multi-agent governance command center API for enterprise approval, policy, audit, Band collaboration, and report workflows.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://yousun-secura.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {
        "status": "running",
        "project": "YOUSUN Secura",
        "message": "Multi-agent governance command center API is active",
    }


@app.get("/api/requests")
def get_requests():
    return {
        "total": 128,
        "pending_review": 23,
        "high_risk": 7,
        "approved": 63,
        "rejected": 35,
        "items": [
            {
                "id": "BR-2025-05-1287",
                "title": "Export customer emails for campaign",
                "requester": "Marketing Intern",
                "department": "Marketing",
                "risk": "High",
                "status": "Pending Review",
                "submitted": "Just now",
            },
            {
                "id": "RR-2025-05-1286",
                "title": "Approve refund of $4,500",
                "requester": "Refund Agent",
                "department": "Finance",
                "risk": "Medium",
                "status": "Pending Review",
                "submitted": "5m ago",
            },
            {
                "id": "AR-2025-05-1285",
                "title": "Access employee salary data",
                "requester": "HR Executive",
                "department": "HR",
                "risk": "Medium",
                "status": "In Review",
                "submitted": "15m ago",
            },
        ],
    }


@app.get("/api/agents")
def get_agents():
    return {
        "total_agents": 8,
        "active_agents": 7,
        "status": "operational",
        "agents": [
            {
                "name": "Request Intake Agent",
                "role": "Captures and normalizes incoming enterprise requests",
                "status": "online",
            },
            {
                "name": "Policy Review Agent",
                "role": "Matches requests against company governance policies",
                "status": "online",
            },
            {
                "name": "Permission Agent",
                "role": "Checks requester role and permission scope",
                "status": "online",
            },
            {
                "name": "Data Sensitivity Agent",
                "role": "Classifies PII, confidential, financial, and employee data",
                "status": "online",
            },
            {
                "name": "Security Risk Agent",
                "role": "Scores security risk and recommends action",
                "status": "online",
            },
            {
                "name": "Audit Evidence Agent",
                "role": "Generates audit evidence and report logs",
                "status": "online",
            },
            {
                "name": "Human Escalation Agent",
                "role": "Routes high-risk actions to human reviewers",
                "status": "online",
            },
            {
                "name": "Final Decision Agent",
                "role": "Combines findings into final governance decision",
                "status": "standby",
            },
        ],
    }


@app.get("/api/band-room")
def get_band_room():
    return {
        "room_id": "BR-2025-05-1287",
        "title": "Export customer emails for campaign",
        "status": "active",
        "risk": "High",
        "participants": 8,
        "messages": [
            {
                "agent": "Request Intake Agent",
                "message": "Request received from Marketing Intern to export 50,000 customer emails.",
                "time": "10:24 AM",
            },
            {
                "agent": "Policy Review Agent",
                "message": "DP-03 restricts raw customer email export. Only anonymized or aggregated data is allowed.",
                "time": "10:25 AM",
            },
            {
                "agent": "Permission Agent",
                "message": "Requester role does not have permission for this action. Manager approval required.",
                "time": "10:26 AM",
            },
            {
                "agent": "Data Sensitivity Agent",
                "message": "Customer emails contain PII. Sensitivity level is High.",
                "time": "10:27 AM",
            },
            {
                "agent": "Security Risk Agent",
                "message": "Risk score generated: 85/100. Recommendation: reject raw export.",
                "time": "10:28 AM",
            },
        ],
    }


@app.get("/api/audit-trail")
def get_audit_trail():
    return {
        "total_events": 1248,
        "critical_events": 27,
        "reports_generated": 86,
        "events": [
            {
                "id": "AUD-2025-001248",
                "event": "Request Submitted",
                "actor": "Marketing Intern",
                "timestamp": "2025-05-14 10:24:13",
            },
            {
                "id": "AUD-2025-001249",
                "event": "Policy Restriction Found",
                "actor": "Policy Review Agent",
                "timestamp": "2025-05-14 10:24:51",
            },
            {
                "id": "AUD-2025-001250",
                "event": "Risk Analysis Completed",
                "actor": "Security Risk Agent",
                "timestamp": "2025-05-14 10:25:10",
            },
            {
                "id": "AUD-2025-001251",
                "event": "Final Decision Issued",
                "actor": "Final Decision Agent",
                "timestamp": "2025-05-14 10:25:48",
            },
        ],
    }


@app.get("/api/policies")
def get_policies():
    return {
        "total_policies": 42,
        "active_policies": 36,
        "policy_match_rate": "98%",
        "items": [
            {
                "id": "DP-03",
                "name": "Data Export Policy",
                "risk": "High",
                "status": "Active",
                "rule": "Raw customer data export is restricted for low-privilege roles.",
            },
            {
                "id": "AC-01",
                "name": "Access Control Policy",
                "risk": "High",
                "status": "Active",
                "rule": "Sensitive actions require role-based access validation.",
            },
            {
                "id": "FA-02",
                "name": "Financial Approval Policy",
                "risk": "Medium",
                "status": "Active",
                "rule": "Refunds above threshold require approval.",
            },
        ],
    }


@app.get("/api/reports")
def get_reports():
    return {
        "reports_generated": 86,
        "audit_ready": 39,
        "items": [
            {
                "id": "REP-2025-0086",
                "name": "Customer Data Export Audit Report",
                "status": "Ready",
                "type": "Audit",
            },
            {
                "id": "REP-2025-0085",
                "name": "Weekly Risk Summary",
                "status": "Ready",
                "type": "Risk",
            },
        ],
    }


@app.get("/api/band/status")
async def get_band_status():
    band = get_band_client()
    me = await band.get_me()

    return {
        "band_real_api_enabled": band.enable_real_api,
        "band_ready": band.is_ready,
        "rest_url": band.rest_url,
        "agent_id_configured": bool(band.agent_id),
        "api_key_configured": bool(band.api_key),
        "agent": me,
    }


@app.post("/api/run-governance-workflow")
async def run_governance_workflow():
    workflow = await run_band_governance_workflow()
    return JSONResponse(content=workflow)


@app.get("/api/download-report")
def download_report_mock():
    report_content = """
YOUSUN SECURA
Multi-Agent Governance Audit Report

Report ID: REP-2025-0086
Linked Band Room: BR-2025-05-1287
Request: Export customer emails for campaign
Requester: Marketing Intern
Department: Marketing

FINAL DECISION
Decision: Rejected
Risk Level: High
Risk Score: 85/100

REASON
The requester role does not have permission to export raw customer email data.
The request involves customer personally identifiable information.
Policy DP-03 restricts raw customer data export by low-privilege roles.

AGENT FINDINGS
1. Request Intake Agent:
Request normalized and routed into governance workflow.

2. Policy Review Agent:
DP-03 Data Export Policy matched. Raw export is restricted.

3. Permission Agent:
Requester role is insufficient for raw customer email export.

4. Data Sensitivity Agent:
Customer emails classified as PII. Sensitivity: High.

5. Security Risk Agent:
High risk of data leakage and misuse. Risk score: 85/100.

6. Human Escalation Agent:
Human approval required for exception.

7. Final Decision Agent:
Raw export rejected. Safe alternative recommended.

8. Audit Evidence Agent:
Audit evidence package generated.

SAFE ALTERNATIVE
Provide anonymized campaign audience report instead of raw email export.

BAND COLLABORATION PROOF
Band is used as the collaboration layer where each specialist agent posts structured findings.
The final governance decision is generated from the shared agent review trail.

AUDIT STATUS
Audit Ready: Yes
Evidence Package: Created
Policy Match: DP-03
Human Review Required: Yes

Generated by YOUSUN Secura API
""".strip()

    return Response(
        content=report_content,
        media_type="text/plain",
        headers={
            "Content-Disposition": "attachment; filename=YOUSUN-Secura-Audit-Report.txt"
        },
    )



