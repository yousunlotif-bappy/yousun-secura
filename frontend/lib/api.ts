export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://yousun-secura.onrender.com"
).replace(/\/$/, "");

export type BandLiveProof = {
  band_mode: "real" | "demo" | "not_real";
  fallback_used: boolean;
  band_api_verified: boolean;
  band_room_created: boolean;
  band_room_id: string | null;
  messages_posted: number;
  agents_collaborated: number;
  context_retrieved: boolean;
  human_escalation_triggered: boolean;
  final_decision_generated_from_band_history: boolean;
  audit_report_generated: boolean;
  proof_record_type?: string;
  proof_note?: string;
  demo_notice?: string;
  error?: string;
};

async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`${API_BASE_URL}${cleanPath}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `API request failed with ${response.status}`);
  }

  return response.json();
}

export async function getBandLiveProof(): Promise<BandLiveProof> {
  return fetchJson<BandLiveProof>("/api/band/live-proof");
}

export async function runGovernanceWorkflow() {
  return fetchJson("/api/run-governance-workflow", {
    method: "POST",
  });
}

export function getDownloadReportUrl() {
  return `${API_BASE_URL}/api/download-report`;
}
