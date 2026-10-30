import { EvidenceReceipt } from "./receipt";
import catalogData from "../../data/agents-catalog.json";

export interface JobRecord {
  id: string;
  jobId: string;
  agentSlug: string;
  title: string;
  status: "SUBMITTED" | "ESCROW_LOCKED" | "RUNNING" | "COMPLETED" | "FAILED";
  input: Record<string, unknown>;
  budgetPaise: number;
  budgetCents: number;
  createdAt: string;
  updatedAt: string;
  events: Array<{
    id: string;
    status: string;
    message: string;
    timestamp: string;
  }>;
  deliverable?: {
    summaryMarkdown: string;
    structuredJson: Record<string, unknown>;
    sha256Receipt: string;
    modelUsed: string;
    tokensUsed: number;
    latencyMs: number;
  };
  receipt?: EvidenceReceipt;
  error?: string;
}

// In-memory persistent registry for active/recent jobs across requests
const globalJobStore = globalThis as unknown as {
  __forgentJobStore?: Map<string, JobRecord>;
};

if (!globalJobStore.__forgentJobStore) {
  globalJobStore.__forgentJobStore = new Map<string, JobRecord>();
}

export const jobStore = globalJobStore.__forgentJobStore;

export function findAgentInCatalog(slug: string) {
  return catalogData.find((a) => a.slug === slug);
}

export function createJob(params: {
  agentSlug: string;
  input: Record<string, unknown>;
}): JobRecord {
  const agent = findAgentInCatalog(params.agentSlug);
  const now = new Date().toISOString();
  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  const job: JobRecord = {
    id,
    jobId: id,
    agentSlug: params.agentSlug,
    title: agent?.title || `Execution for ${params.agentSlug}`,
    status: "SUBMITTED",
    input: params.input,
    budgetPaise: agent?.pricePaise || 8000,
    budgetCents: agent?.priceCents || 100,
    createdAt: now,
    updatedAt: now,
    events: [
      {
        id: `ev_${Date.now()}_sub`,
        status: "SUBMITTED",
        message: `Job ${id} submitted for agent ${params.agentSlug}`,
        timestamp: now,
      },
    ],
  };

  jobStore.set(id, job);
  return job;
}

export function updateJobStatus(
  jobId: string,
  status: JobRecord["status"],
  message: string
): JobRecord | undefined {
  const job = jobStore.get(jobId);
  if (!job) return undefined;

  job.status = status;
  job.updatedAt = new Date().toISOString();
  job.events.push({
    id: `ev_${Date.now()}_${status.toLowerCase()}`,
    status,
    message,
    timestamp: job.updatedAt,
  });

  jobStore.set(jobId, job);
  return job;
}
