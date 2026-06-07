import { Link } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { HistoryItem } from "@/lib/history-store";
import { getDisease } from "@/lib/diseases";

type Props = { item: HistoryItem };

export function ResultCard({ item }: Props) {
  const disease = getDisease(item.diseaseId);
  const healthy = disease.status === "healthy";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1.4fr]">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img
          src={item.imageDataUrl}
          alt={item.fileName}
          className="aspect-square w-full object-cover bg-muted/40"
        />
        <div className="border-t border-border px-4 py-3 text-sm">
          <div className="truncate font-medium">{item.fileName}</div>
          <div className="text-xs text-muted-foreground">
            Analyzed {new Date(item.timestamp).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Badge variant={healthy ? "secondary" : "destructive"} className="mb-2">
                {healthy ? (
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                ) : (
                  <AlertTriangle className="mr-1 h-3 w-3" />
                )}
                {healthy ? "Healthy" : "Disease detected"}
              </Badge>
              <h2 className="font-display text-2xl font-semibold">{disease.name}</h2>
              <div className="mt-1 text-sm text-muted-foreground">
                Crop: {disease.crop}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Confidence
              </div>
              <div className="font-display text-3xl font-semibold text-primary">
                {item.confidence.toFixed(1)}%
              </div>
            </div>
          </div>
          <Progress value={item.confidence} className="mt-4 h-2" />
        </div>

        <Section title="Description">{disease.description}</Section>
        <Section title="Treatment">{disease.treatment}</Section>
        <Section title="Prevention">{disease.prevention}</Section>

        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild>
            <Link to="/detect">
              <Sparkles className="mr-2 h-4 w-4" /> Analyze another image
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/history">
              View history <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </div>
      <p className="text-sm leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
