"use client";

import Image from "next/image";
import Link from "next/link";

export default function GetStartedCard() {
  return (
    <div className="border border-gray-300 rounded-2xl p-4">
      <h3 className="font-bold text-lg">Get started</h3>

      <div className="mt-4 rounded-lg bg-gray-50 p-4 flex items-center gap-4">
        <div className="shrink-0 bg-gray-100 p-3 rounded-md border-r border-gray-300">
          <Image src="/icon.svg" alt="icon" width={56} height={56} />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold">Get started with Fine-tuning</h4>
          <p className="text-sm text-gray-600 mt-2">Simple, ready-to-use inference endpoints that are paid for per request. No commitments, only pay for what you use with Nscale Serverless.</p>

          <div className="mt-4">
            <Link href="/model-setup" className="inline-block">
              <span className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm">New Fine-tuning Job</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
