import { createFileRoute } from "@tanstack/react-router";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — PlantGuard AI" },
      {
        name: "description",
        content:
          "Project blueprint for an AI-based plant disease detection system using deep learning and MobileNetV2.",
      },
      { property: "og:title", content: "Project Blueprint — PlantGuard AI" },
      {
        property: "og:description",
        content: "Architecture, modules, dataset, and ML workflow for the plant disease detector.",
      },
    ],
  }),
  component: About,
});

const MODULES = [
  { n: "1", title: "Image Upload", body: "Accept JPG/PNG/JPEG leaf images and store on the server." },
  { n: "2", title: "Image Preprocessing", body: "Resize to 224×224, normalize to 0–1, add batch dim." },
  { n: "3", title: "Disease Prediction", body: "MobileNetV2 forward pass returns class + confidence." },
  { n: "4", title: "Disease Information", body: "Lookup description, treatment, and prevention." },
  { n: "5", title: "Result Display", body: "Render image, disease name, confidence and guidance." },
];

const DATASET = [
  "Tomato_Healthy",
  "Tomato_Early_Blight",
  "Tomato_Late_Blight",
  "Potato_Healthy",
  "Potato_Early_Blight",
  "Potato_Late_Blight",
  "Pepper_Healthy",
  "Pepper_Bacterial_Spot",
];

const FUTURE = [
  "Mobile application",
  "Multi-language support",
  "Real-time camera detection",
  "Fertilizer recommendation",
  "Weather-based disease alerts",
  "AI chatbot for farmers",
  "Cloud deployment",
];

function About() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
        Project Blueprint
      </div>
      <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-5xl">
        AI-Based Plant Disease Detection System
      </h1>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Using deep learning and computer vision to detect diseases from leaf images,
        classify healthy versus diseased plants, and recommend treatment and prevention.
      </p>

      <Grid title="Objectives">
        {[
          "Detect plant diseases from leaf images.",
          "Classify healthy and diseased plants.",
          "Display disease information and confidence score.",
          "Provide treatment and prevention recommendations.",
          "Create a user-friendly web application.",
        ].map((x) => (
          <Card key={x}>{x}</Card>
        ))}
      </Grid>

      <Section title="System Architecture">
        <div className="grid items-start gap-8 md:grid-cols-[1fr_1fr]">
          <ArchitectureDiagram />
          <div className="space-y-3 text-sm text-foreground/90">
            <p>
              The user uploads a leaf image to a Flask web application. The image is
              preprocessed (resized, normalized, batched) and passed through a
              MobileNetV2 CNN trained on the PlantVillage dataset.
            </p>
            <p>
              The model returns a disease class and confidence score, which the app
              joins with a knowledge base of descriptions, treatments, and prevention
              tips before rendering the result page.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Project Modules">
        <div className="grid gap-3 md:grid-cols-2">
          {MODULES.map((m) => (
            <div key={m.n} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                Module {m.n}
              </div>
              <div className="mt-1 font-display text-lg font-semibold">{m.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{m.body}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Dataset Structure (PlantVillage)">
        <div className="rounded-2xl border border-border bg-card p-5 font-mono text-xs leading-relaxed">
          dataset/
          {DATASET.map((d) => (
            <div key={d} className="pl-4 text-muted-foreground">
              ├── {d}/
            </div>
          ))}
        </div>
      </Section>

      <Section title="Technology Stack">
        <div className="grid gap-4 md:grid-cols-3">
          <StackBlock title="Frontend" items={["HTML5", "CSS3", "Bootstrap 5", "JavaScript"]} />
          <StackBlock title="Backend" items={["Python", "Flask"]} />
          <StackBlock title="ML & Data" items={["TensorFlow", "Keras", "MobileNetV2", "NumPy", "Pillow"]} />
        </div>
      </Section>

      <Section title="Machine Learning Workflow">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Training</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>Load PlantVillage dataset.</li>
              <li>Image augmentation (flip, rotate, zoom).</li>
              <li>Train MobileNetV2 with transfer learning.</li>
              <li>Validate on held-out split.</li>
              <li>Save model as <code>plant_model.h5</code>.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">Inference</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>Receive uploaded leaf image.</li>
              <li>Preprocess to 224×224 normalized tensor.</li>
              <li>Run forward pass through saved model.</li>
              <li>Return top class + confidence.</li>
              <li>Render result page with guidance.</li>
            </ol>
          </div>
        </div>
      </Section>

      <Section title="Future Enhancements">
        <div className="flex flex-wrap gap-2">
          {FUTURE.map((f) => (
            <span
              key={f}
              className="rounded-full border border-border bg-card px-3 py-1 text-sm"
            >
              {f}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{children}</div>
    </section>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-sm shadow-sm">
      {children}
    </div>
  );
}

function StackBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </div>
      <ul className="mt-2 space-y-1 text-sm">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
