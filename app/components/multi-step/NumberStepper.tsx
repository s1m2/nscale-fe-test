"use client";

import React from "react";

type Props = {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  ariaLabel?: string;
};

export default function NumberStepper({ value, onIncrement, onDecrement, min = 0, max, ariaLabel }: Props) {
  const decDisabled = typeof min === "number" ? value <= min : false;
  const incDisabled = typeof max === "number" ? value >= max : false;

  return (
    <div className="flex items-center gap-2 mt-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={onDecrement}
        className="px-3 py-1 bg-black text-white rounded"
        disabled={decDisabled}
        aria-label="decrement"
      >
        -
      </button>
      <div className="w-12 text-center" aria-live="polite">{value}</div>
      <button
        type="button"
        onClick={onIncrement}
        className="px-3 py-1 bg-black text-white rounded"
        disabled={incDisabled}
        aria-label="increment"
      >
        +
      </button>
    </div>
  );
}
