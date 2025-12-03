"use client";

import Image from "next/image";

type Props = {
  icon: string;
  title: string;
  children: React.ReactNode;
};

export default function ReviewItem({ icon, title, children }: Props) {
  return (
    <div className="border border-gray-300 rounded p-8">
      <div className="flex items-center gap-4">
        <div className="shrink-0">
          <Image src={icon} alt={title} width={48} height={48} />
        </div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
