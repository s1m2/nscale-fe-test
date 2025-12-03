"use client";

import { useFormStore } from "@/stores/store";
import NumberStepper from "./NumberStepper";
import type { FormData } from "@/stores/store";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Field from "@/app/components/ui/Field";

export default function StepTwo({ onNext }: { onNext: () => void }) {
  const { formData, updateForm } = useFormStore();

  const stepTwoSchema = z.object({
    epochs: z.number().int().min(0, "Epochs must be 0 or greater"),
    evaluationEpochs: z.number().int().min(0, "Evaluation epochs must be 0 or greater"),
    warmupEpochs: z.number().int().min(0, "Warmup epochs must be 0 or greater"),
    learningRate: z.number().min(0, "Learning rate must be >= 0").max(1, "Learning rate must be <= 1"),
  });

  type StepTwoValues = z.infer<typeof stepTwoSchema>;

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<StepTwoValues>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      epochs: formData.epochs,
      evaluationEpochs: formData.evaluationEpochs,
      warmupEpochs: formData.warmupEpochs,
      learningRate: formData.learningRate,
    },
  });

  const onSubmit = (data: StepTwoValues) => {
    updateForm(data as Partial<FormData>);
    onNext();
  };

  const epochs = Number(useWatch({ control, name: "epochs" }) ?? 0);
  const evaluationEpochs = Number(useWatch({ control, name: "evaluationEpochs" }) ?? 0);
  const warmupEpochs = Number(useWatch({ control, name: "warmupEpochs" }) ?? 0);

  const incEpochs = () => setValue("epochs", epochs + 1, { shouldDirty: true });
  const decEpochs = () => setValue("epochs", Math.max(0, epochs - 1), { shouldDirty: true });

  const incEvaluation = () => setValue("evaluationEpochs", evaluationEpochs + 1, { shouldDirty: true });
  const decEvaluation = () => setValue("evaluationEpochs", Math.max(0, evaluationEpochs - 1), { shouldDirty: true });

  const incWarmup = () => setValue("warmupEpochs", warmupEpochs + 1, { shouldDirty: true });
  const decWarmup = () => setValue("warmupEpochs", Math.max(0, warmupEpochs - 1), { shouldDirty: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Configure your run</h2>
      <p className="text-sm text-gray-600">Adjust these parameters to control how your model learns, balances performance, and prevents overfitting during fine-tuning. See the docs for guidance on setting these parameters for optimal fine-tuning.</p>

      <div className="flex gap-4">
        <div className="flex-1">
          <Field label="Epochs" helper="Number of times the model sees the full dataset during training">
            <NumberStepper
              value={epochs}
              onDecrement={decEpochs}
              onIncrement={incEpochs}
              ariaLabel="epochs-stepper"
            />
            <input type="hidden" {...register("epochs", { valueAsNumber: true })} />
          </Field>
        </div>

        <div className="flex-1">
          <Field label="Evaluation Epochs" helper="How often the model is evaluated during training">
            <NumberStepper
              value={evaluationEpochs}
              onDecrement={decEvaluation}
              onIncrement={incEvaluation}
              ariaLabel="evaluation-epochs-stepper"
            />
            <input type="hidden" {...register("evaluationEpochs", { valueAsNumber: true })} />
          </Field>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Field label="Warmup Epochs" helper="Gradually increases the learning rate at the start of training">
            <NumberStepper
              value={warmupEpochs}
              onDecrement={decWarmup}
              onIncrement={incWarmup}
              ariaLabel="warmup-epochs-stepper"
            />
            <input type="hidden" {...register("warmupEpochs", { valueAsNumber: true })} />
          </Field>
        </div>

        <div className="flex-1">
          <Field label="Learning rate" helper="Controls how much the model updates during training" error={errors.learningRate?.message ? String(errors.learningRate.message) : null}>
            <input type="number" step="0.0001" {...register("learningRate", { valueAsNumber: true })} className="border border-gray-300 p-2 rounded mt-2 w-full" />
          </Field>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button type="submit" className="px-4 py-2 bg-black text-white rounded">
          Next: Review
        </button>
      </div>
    </form>
  );
}