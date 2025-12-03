export interface ApiModel {
  id: string;
  displayName: string;
}

export async function getModels(): Promise<ApiModel[]> {
  const res = await fetch('/api/models', {
    headers: { Accept: 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch models: ${res.status}`);
  }

  return (await res.json()) as ApiModel[];
}

export interface Job {
  id: string;
  name: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
  date: string; 
  createdAt: string; 
  status: "Running" | "Completed" | "Failed" | "Pending" | "Error" | string;
}

export async function getJobs(): Promise<Job[]> {
  const res = await fetch('/api/jobs', {
    headers: { Accept: 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.status}`);
  }

  return (await res.json()) as Job[];
}