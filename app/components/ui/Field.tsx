"use client";

type Props = {
  label: string;
  helper?: string;
  error?: string | null;
  children: React.ReactNode;
};

export default function Field({ label, helper, error, children }: Props) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="font-medium">{label}</label>
      {children}
      {helper && <p className="text-sm text-gray-500 mt-1">{helper}</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
