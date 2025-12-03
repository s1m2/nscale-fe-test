"use client";

import { Job, getJobs } from "@/lib/api";
import DonutChart from "../DonutChart";

import { useQuery } from "@tanstack/react-query";
import JobsTable from "./JobsTable";

export default function FineTuningUsageCard() {

    const { data: jobs, isLoading, isError } = useQuery<Job[], Error>({
    queryKey: ["jobs"],
    queryFn: () => getJobs(),
  });
  return (
    <div className="border border-gray-300 rounded-2xl p-4">
      <h3 className="font-bold text-lg">Fine-tuning usage</h3>
      <p className="text-sm text-gray-600 mt-2">Card description.</p>

      <div className="mt-4 flex items-center gap-6">
        <div className="w-36 h-36 flex items-center justify-center">
          <DonutChart
            segments={[
              { value: 5, color: "#10B981" },
              { value: 4, color: "#3B82F6" },
              { value: 3, color: "#EF4444" },
            ]}
            size={120}
            strokeWidth={12}
          />
        </div>
      
        <div className="flex-1">
          <ul className="w-full flex flex-col gap-2">
            <li className="flex items-center w-full">
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
                <span className="font-medium">Completed:</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-3" />
              <span className="ml-2 shrink-0">5 jobs</span>
            </li>
            <li className="flex items-center w-full">
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
                <span className="font-medium">Running:</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-3" />
              <span className="ml-2 shrink-0">4 jobs</span>
            </li>
            <li className="flex items-center w-full">
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="font-medium">Failed:</span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-3" />
              <span className="ml-2 shrink-0">3 jobs</span>
            </li>
          </ul>
        </div>

      </div>
        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4">Jobs</h2>
          <JobsTable jobs={jobs} isLoading={isLoading} isError={isError} />
        </div>
    </div>
  );
}
