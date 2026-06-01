export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function runGovernanceWorkflow() {
  const response = await fetch(`${API_BASE_URL}/api/run-governance-workflow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to run governance workflow");
  }

  return response.json();
}

export function getDownloadReportUrl() {
  return `${API_BASE_URL}/api/download-report`;
}

