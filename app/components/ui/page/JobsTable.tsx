import React from "react";
import StatusBadge from "../common/StatusBadge";
import JobDateCell from "../common/JobDateCell";
import { Job } from "../../../../lib/api";
import Image from "next/image";

type Props = {
  jobs?: Job[];
  isLoading?: boolean;
  isError?: boolean;
};

export default function JobsTable({ jobs, isLoading, isError }: Props) {
  if (isLoading) return <div className="text-sm text-gray-600">Loading jobs...</div>;
  if (isError) return <div className="text-sm text-red-600">Failed to load jobs.</div>;
  if (!jobs || jobs.length === 0) return <div className="text-sm text-gray-600">No jobs found.</div>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {jobs?.jobs.map((job: Job) => (
            <tr key={job.id}>
              <td className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 bg-gray-100 px-2 py-1 border border-gray-200 rounded-sm text-sm text-gray-700">
                    {job.id} <Image src="/square-2-stack.svg" alt="icon" width={20} height={20} />
                  </div>
                  
                </div>
              </td>
              <td className="px-4 py-3">
                <JobDateCell date={job.date} name={job.name} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={job.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
