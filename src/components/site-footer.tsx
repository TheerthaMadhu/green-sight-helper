export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 text-sm text-muted-foreground md:flex-row md:items-center">
        <div>
          <div className="font-display text-base font-semibold text-foreground">
            PlantGuard AI
          </div>
          <div className="mt-1">
            AI-Based Plant Disease Detection System Using Deep Learning
          </div>
        </div>
        <div className="text-xs">
          Built as a final-year project demo · MobileNetV2 + Flask reference architecture
        </div>
      </div>
    </footer>
  );
}
