## Plan: AI Plant Disease Detection — UI Demo (Mocked)

A presentation-ready React/TanStack Start build of your blueprint. No Python/Flask, no real model — instead a deterministic mock "predictor" returns realistic results so the full UX (upload → preprocess animation → result → history) is demoable end-to-end.

### Pages (routes)

- `/` — Landing: hero, problem statement, objectives, how-it-works flow diagram, tech stack chips, CTA to detector.
- `/detect` — Upload + Predict: drag-and-drop / file picker (JPG/PNG/JPEG), preview, "Analyze" button, simulated preprocessing steps (resize → normalize → predict) with progress, then result card.
- `/result/$id` — Result detail: uploaded image, disease name, confidence %, description, treatment, prevention, "Analyze another" button.
- `/history` — Prediction history list (stored in localStorage for the demo) with thumbnail, disease, confidence, timestamp; click to reopen result.
- `/about` — Project blueprint: architecture diagram, modules, dataset structure, ML workflow, future enhancements. Acts as the report-style page.

Shared header nav + footer across all routes. Each route gets its own SEO `head()`.

### Mock prediction logic

A small `src/lib/mock-predictor.ts` with a disease dictionary covering the blueprint's classes (Tomato Healthy/Early Blight/Late Blight, Potato Healthy/Early Blight/Late Blight, Pepper Healthy/Bacterial Spot) — each with description, treatment, prevention. The "predictor" hashes the file name + size to deterministically pick a class and generate a confidence between 88–98%, then resolves after a simulated delay with staged progress messages so it feels like real inference.

### Design (clean agricultural/green theme)

- Tokens in `src/styles.css` using oklch: leafy green primary, warm off-white background, soft sand/earth accents, deep forest foreground. Subtle leaf pattern on hero. Rounded cards, generous spacing, friendly sans-serif (Inter via `<link>` in `__root.tsx`).
- Components use shadcn/ui (Card, Button, Progress, Badge, Tabs) styled through semantic tokens — no hardcoded colors.

### Technical notes

- Stack stays TanStack Start + React + Tailwind v4. No backend enabled; history persists in `localStorage`. Uploaded images are kept as base64 in localStorage for the demo.
- New files: `src/routes/index.tsx` (replace placeholder), `src/routes/detect.tsx`, `src/routes/result.$id.tsx`, `src/routes/history.tsx`, `src/routes/about.tsx`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/upload-dropzone.tsx`, `src/components/result-card.tsx`, `src/components/architecture-diagram.tsx`, `src/lib/mock-predictor.ts`, `src/lib/history-store.ts`, `src/lib/diseases.ts`.
- Update `src/styles.css` with green theme tokens; update `__root.tsx` only to add the font `<link>` (preserve `<Outlet />`).
- Small "Demo — mocked inference" badge in header so reviewers know the model is simulated, matching your UI-only choice. Easy to swap the mock for Lovable AI vision later.

### Out of scope

No real TensorFlow/MobileNetV2 inference, no Flask backend, no database, no auth.
