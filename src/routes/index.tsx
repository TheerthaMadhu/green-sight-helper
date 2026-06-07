import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Leaf,
  ScanLine,
  Sparkles,
  ShieldCheck,
  Upload,
  Cpu,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlantGuard AI — Detect Plant Diseases from Leaf Images" },
      {
        name: "description",
        content:
          "AI-based plant disease detection system. Upload a leaf image and get the predicted disease, confidence, treatment, and prevention tips.",
      },
      { property: "og:title", content: "PlantGuard AI — Plant Disease Detection" },
      {
        property: "og:description",
        content:
          "Detect plant diseases from leaf images using a MobileNetV2-style deep learning workflow.",
      },
    ],
  }),
  component: Home,
});

const OBJECTIVES = [
  { icon: ScanLine, title: "Detect diseases", body: "Identify disease from a single leaf image." },
  { icon: Leaf, title: "Classify health", body: "Distinguish healthy plants from diseased ones." },
  { icon: Sparkles, title: "Confidence score", body: "Show disease info with a confidence rating." },
  { icon: ShieldCheck, title: "Treatment advice", body: "Recommend treatment and prevention." },
];

const STACK = [
  "Python", "TensorFlow", "Keras", "MobileNetV2",
  "Flask", "NumPy", "Pillow", "PlantVillage Dataset",
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="leaf-pattern relative overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              AI · Computer Vision · Agriculture
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Detect plant diseases <span className="text-primary">before</span> they spread.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
              Upload a leaf image. Our deep learning model identifies the disease,
              gives a confidence score, and suggests treatment and prevention — in seconds.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/detect">
                  <Upload className="mr-2 h-4 w-4" /> Try the detector
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">
                  Read the blueprint <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="rounded-3xl border border-border bg-card p-6 shadow-leaf">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <Leaf className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">Tomato — Early Blight</div>
                  <div className="text-xs text-muted-foreground">Sample prediction</div>
                </div>
                <div className="ml-auto font-display text-2xl font-semibold text-primary">96.7%</div>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Description
                  </div>
                  <p className="text-foreground/90">
                    Fungal disease causing concentric brown lesions on older leaves.
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Treatment
                  </div>
                  <p className="text-foreground/90">Apply a copper-based fungicide.</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Prevention
                  </div>
                  <p className="text-foreground/90">
                    Avoid overhead watering and maintain plant spacing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                The Problem
              </div>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
                Late detection costs farmers their harvest.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Farmers often struggle to identify plant diseases early, leading to crop
                loss and reduced productivity. PlantGuard AI uses computer vision to
                identify diseases from a single leaf image and recommends targeted action.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {OBJECTIVES.map((o) => (
                <div key={o.title} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <o.icon className="h-5 w-5 text-primary" />
                  <div className="mt-2 font-semibold">{o.title}</div>
                  <div className="text-sm text-muted-foreground">{o.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              How it works
            </div>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight">
              Image → Model → Diagnosis
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A MobileNetV2 CNN, trained on the PlantVillage dataset, runs inside a Flask
              backend to produce reliable predictions.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1.1fr]">
            <ArchitectureDiagram />
            <div className="grid gap-4">
              <FeatureRow icon={Upload} title="Upload" body="JPG, PNG, or JPEG leaf images stored on the server." />
              <FeatureRow icon={Cpu} title="Preprocess" body="Resize to 224×224, normalize, add batch dimension." />
              <FeatureRow icon={Sparkles} title="Predict" body="MobileNetV2 forward pass produces class + confidence." />
              <FeatureRow icon={FileText} title="Report" body="Disease name, description, treatment and prevention." />
            </div>
          </div>
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-14">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-primary">
            Technology Stack
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm text-foreground/80"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ready to scan a leaf?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Upload any clear leaf photo to see the full prediction flow.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link to="/detect">
              <Upload className="mr-2 h-4 w-4" /> Open the detector
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

function FeatureRow({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Upload;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}
