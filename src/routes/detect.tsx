import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadDropzone } from "@/components/upload-dropzone";
import {
  PREDICTION_STAGES,
  TOTAL_PREDICTION_MS,
  predict,
} from "@/lib/mock-predictor";
import { saveHistory } from "@/lib/history-store";

export const Route = createFileRoute("/detect")({
  head: () => ({
    meta: [
      { title: "Detect — PlantGuard AI" },
      {
        name: "description",
        content:
          "Upload a leaf image and get an AI-powered disease prediction with confidence score and recommendations.",
      },
      { property: "og:title", content: "Detect a Plant Disease — PlantGuard AI" },
      {
        property: "og:description",
        content: "Upload a leaf image to identify the disease in seconds.",
      },
    ],
  }),
  component: Detect,
});

type Selected = { file: File; dataUrl: string };

function Detect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Selected | null>(null);
  const [stage, setStage] = useState<number>(-1);
  const [progress, setProgress] = useState(0);

  const running = stage >= 0 && stage < PREDICTION_STAGES.length;

  async function runAnalysis() {
    if (!selected) return;
    setStage(0);
    setProgress(0);

    let elapsed = 0;
    for (let i = 0; i < PREDICTION_STAGES.length; i++) {
      setStage(i);
      const dur = PREDICTION_STAGES[i].durationMs;
      const start = performance.now();
      await new Promise<void>((resolve) => {
        const tick = () => {
          const t = performance.now() - start;
          const pct = Math.min(1, t / dur);
          setProgress(((elapsed + pct * dur) / TOTAL_PREDICTION_MS) * 100);
          if (pct < 1) requestAnimationFrame(tick);
          else resolve();
        };
        requestAnimationFrame(tick);
      });
      elapsed += dur;
    }

    const prediction = predict({
      name: selected.file.name,
      size: selected.file.size,
    });
    const id = crypto.randomUUID();
    saveHistory({
      id,
      imageDataUrl: selected.dataUrl,
      fileName: selected.file.name,
      diseaseId: prediction.disease.id,
      diseaseName: prediction.disease.name,
      status: prediction.disease.status,
      confidence: prediction.confidence,
      timestamp: Date.now(),
    });
    navigate({ to: "/result/$id", params: { id } });
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
          Module 1 · Image Upload
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
          Upload a leaf image to analyze
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          For best results, use a well-lit, close-up photo of a single leaf against a
          neutral background.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <UploadDropzone
          file={selected}
          onFile={(file, dataUrl) => {
            setSelected({ file, dataUrl });
            setStage(-1);
            setProgress(0);
          }}
          onClear={() => {
            setSelected(null);
            setStage(-1);
            setProgress(0);
          }}
        />

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Modules 2–3 · Preprocess & Predict
          </div>
          <h2 className="mt-1 font-display text-xl font-semibold">Pipeline</h2>

          <ul className="mt-4 space-y-2 text-sm">
            {PREDICTION_STAGES.map((s, i) => {
              const done = stage > i || (stage === PREDICTION_STAGES.length - 1 && !running);
              const active = stage === i && running;
              return (
                <li
                  key={s.label}
                  className="flex items-center gap-3 rounded-lg border border-border bg-background/60 px-3 py-2"
                >
                  {done ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <span className="h-4 w-4 rounded-full border border-border" />
                  )}
                  <span className={active ? "font-medium" : "text-foreground/80"}>
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <Progress value={progress} className="mt-5 h-2" />

          <Button
            className="mt-5 w-full"
            size="lg"
            disabled={!selected || running}
            onClick={runAnalysis}
          >
            {running ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Analyze image
              </>
            )}
          </Button>

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Demo mode — inference is simulated using the project's reference architecture.
          </p>
        </div>
      </div>
    </div>
  );
}
