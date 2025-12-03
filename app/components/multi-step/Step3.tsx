"use client";

import Image from "next/image";
import { useFormStore } from "@/stores/store";
import ReviewItem from "@/app/components/ui/ReviewItem";

export default function StepThree({ onStart }: { onStart?: () => void }) {
  const { formData, updateForm } = useFormStore();

  const handleStart = () => {
    updateForm(formData);
    onStart?.();
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Review your job</h2>

      <div className="flex flex-col gap-4">
        <ReviewItem icon="/wrench-screwdriver.svg" title="Job name">
          <p className="mt-2">{formData.name || "(not set)"}</p>
        </ReviewItem>

        <ReviewItem icon="/chat-bubble-left-right.svg" title="Model">
          <p className="mt-2">{formData.baseModel || "(not selected)"}</p>
        </ReviewItem>

        <ReviewItem icon="/cog-6-tooth.svg" title="Configuration">
          <ul className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
            <li className="inline-flex items-center gap-2"><strong>Epochs:</strong> {formData.epochs}</li>
            <li className="inline-flex items-center gap-2"><strong>Eval epochs:</strong> {formData.evaluationEpochs}</li>
            <li className="inline-flex items-center gap-2"><strong>Warmup epochs:</strong> {formData.warmupEpochs}</li>
            <li className="inline-flex items-center gap-2"><strong>Learning rate:</strong> {formData.learningRate}</li>
          </ul>
        </ReviewItem>
      </div>

      <div className="flex justify-between mt-4">
        <button type="button" onClick={handleStart} className="px-4 py-2 bg-black text-white rounded w-fit">
          Start fine-tuning
        </button>
      </div>
    </div>
  );
}