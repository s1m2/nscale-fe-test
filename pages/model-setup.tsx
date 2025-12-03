"use client";

import { useState } from "react";
import Image from "next/image";

import StepOne from "../app/components/multi-step/Step1";
import StepTwo from "../app/components/multi-step/Step2";
import StepThree from "../app/components/multi-step/Step3";

export default function MultiStepForm() {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div>

      <div className="m-10">
        <div className="flex items-center gap-4 mb-4">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-2 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Image src="/arrow-left.svg" alt="back" width={25} height={25} />
          </button>
           <Image src="/icon.svg" alt="back" width={70} height={70} />
          <div>
            <p className="text-small">Fine-tuning</p>
            <h1 className="text-2xl font-bold">Fine-tune a model</h1>
          </div>
        </div>

        <div className="border border-gray-300 p-10 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Step {step} of 3</h2>
          {step === 1 && <StepOne onNext={nextStep} />}
          {step === 2 && <StepTwo onNext={nextStep} />}
          {step === 3 && <StepThree />}
        </div>
      </div>
    </div>
  );
}
