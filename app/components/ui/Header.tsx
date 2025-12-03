"use client";

import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center gap-4 p-6">
      <div className="flex items-center gap-3">
        <div className="w-20 h-20 rounded-lg bg-black flex items-center justify-center text-white font-bold text-3xl">AI</div>
        <span className="text-2xl font-semibold">Acme Inc</span>
      </div>
    </header>
  );
}
