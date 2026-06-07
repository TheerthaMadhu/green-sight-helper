import { ArrowDown } from "lucide-react";

const STEPS = [
  { title: "Upload Leaf Image", note: "User uploads via web app" },
  { title: "Image Preprocessing", note: "Resize 224×224 · Normalize · Batch" },
  { title: "CNN / MobileNetV2 Model", note: "Forward pass · Softmax" },
  { title: "Disease Prediction", note: "Class label + confidence" },
  { title: "Result Page", note: "Name · Confidence · Treatment · Prevention" },
];

export function ArchitectureDiagram() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-stretch gap-3">
      {STEPS.map((s, i) => (
        <div key={s.title}>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm">
            <div className="font-display text-sm font-semibold">{s.title}</div>
            <div className="text-xs text-muted-foreground">{s.note}</div>
          </div>
          {i < STEPS.length - 1 && (
            <div className="flex justify-center py-1 text-primary/60">
              <ArrowDown className="h-4 w-4" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
