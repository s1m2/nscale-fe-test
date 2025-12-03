import { create } from "zustand";

export interface FormData {
  name: string;
  password: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
}

export interface FormStore {
  formData: FormData;
  updateForm: (data: Partial<FormData>) => void;
}

export const useFormStore = create<FormStore>((set) => ({
  formData: {
    name: "",
    baseModel: "",
    password: "",
    epochs: 3,
    evaluationEpochs: 1,
    warmupEpochs: 0,
    learningRate: 0.001,
  },
  updateForm: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
}));