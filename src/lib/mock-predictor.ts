import { DISEASES, type Disease } from "./diseases";

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export type PredictionStage = {
  label: string;
  durationMs: number;
};

export const PREDICTION_STAGES: PredictionStage[] = [
  { label: "Resizing image to 224×224", durationMs: 500 },
  { label: "Normalizing pixel values (0–1)", durationMs: 450 },
  { label: "Running inference (MobileNetV2)", durationMs: 900 },
  { label: "Generating confidence scores", durationMs: 400 },
];

export type Prediction = {
  disease: Disease;
  confidence: number;
  topK: Array<{ disease: Disease; confidence: number }>;
};

export function predict(file: { name: string; size: number }): Prediction {
  const seed = hashString(`${file.name}:${file.size}`);
  const disease = DISEASES[seed % DISEASES.length];
  const confidence = 88 + ((seed >> 4) % 1000) / 100; // 88.00 – 97.99
  const others = DISEASES.filter((d) => d.id !== disease.id)
    .slice(0, 3)
    .map((d, i) => ({
      disease: d,
      confidence: Math.max(0.2, (100 - confidence) / (i + 2)),
    }));
  return {
    disease,
    confidence,
    topK: [{ disease, confidence }, ...others],
  };
}

export const TOTAL_PREDICTION_MS = PREDICTION_STAGES.reduce(
  (s, x) => s + x.durationMs,
  0,
);
