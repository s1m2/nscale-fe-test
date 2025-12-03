import React from "react";

type Props = {
  date: string;
  name?: string;
};

export default function JobDateCell({ date, name }: Props) {
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const parsed = date ? new Date(date) : null;

  return (
    <div className="text-sm text-gray-700">
      <div>{parsed ? dateFormatter.format(parsed) : "-"}</div>
      <div className="text-xs text-gray-500">{parsed ? timeFormatter.format(parsed) : "-"}</div>
      {name && <div className="text-xs text-gray-400">{name}</div>}
    </div>
  );
}
