"use client";

import { useFormStore } from "@/stores/store";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { getModels, ApiModel } from "@/lib/api";
import Field from "@/app/components/ui/Field";

export default function StepOne({ onNext }: { onNext: () => void }) {
  const { formData, updateForm } = useFormStore();
  const stepOneSchema = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .regex(/^[a-z0-9-]+$/, "Can only contain lowercase alphanumeric characters and dashes."),
    baseModel: z.string(),
  });

  type StepOneValues = z.infer<typeof stepOneSchema>;

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<StepOneValues>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { name: formData.name, baseModel: formData.baseModel },
    mode: "onChange",
  });

  const { data: models, isLoading, isError } = useQuery<ApiModel[], Error>({
    queryKey: ["models"],
    queryFn: () => getModels(),
  });

  const onSubmit = (data: StepOneValues) => {
    updateForm(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">Set up your run</h2>

      <Field label="Name your job" helper="Can only contain lowercase alphanumeric characters and dashes." error={errors.name?.message ? String(errors.name.message) : null}>
        <input {...register("name")} placeholder="e.g. short-summarization" className="border border-gray-300 p-2 rounded" />
      </Field>

      <Field label="Select base model">
        <select {...register("baseModel")} className="border border-gray-300 p-2 rounded w-fit">
          <option value="">Choose a model</option>
          {isLoading && <option disabled>Loading models...</option>}
          {isError && <option disabled>Failed to load models</option>}
          {Array.isArray(models) && models.map((model: ApiModel) => (
            <option key={model.id} value={model.id}>
              {model.displayName}
            </option>
          ))}
        </select>
      </Field>

        <button
          type="submit"
          disabled={!isValid}
          className="px-4 py-2 bg-black text-white rounded mt-4 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next: Configure
        </button>
    </form>
  );
}