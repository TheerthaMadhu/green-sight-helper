import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2, Upload, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clearHistory, getHistory, type HistoryItem } from "@/lib/history-store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Prediction History — PlantGuard AI" },
      {
        name: "description",
        content: "Browse your past plant disease predictions stored locally on this device.",
      },
    ],
  }),
  component: History,
});

function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setItems(getHistory());
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Module 5 · Results & History
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Prediction history
          </h1>
          <p className="mt-1 text-muted-foreground">
            Stored locally on this device for the demo.
          </p>
        </div>
        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              clearHistory();
              setItems([]);
            }}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <h2 className="font-display text-lg font-semibold">No predictions yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload a leaf image to see it appear here.
          </p>
          <Button asChild className="mt-5">
            <Link to="/detect">
              <Upload className="mr-2 h-4 w-4" /> Start a scan
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.id}
              to="/result/$id"
              params={{ id: it.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-leaf"
            >
              <div className="relative aspect-square w-full bg-muted/40">
                <img
                  src={it.imageDataUrl}
                  alt={it.fileName}
                  className="h-full w-full object-cover transition-transform group-hover:scale-[1.02]"
                />
              </div>
              <div className="space-y-2 p-4">
                <Badge variant={it.status === "healthy" ? "secondary" : "destructive"}>
                  {it.status === "healthy" ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <AlertTriangle className="mr-1 h-3 w-3" />
                  )}
                  {it.status === "healthy" ? "Healthy" : "Diseased"}
                </Badge>
                <div className="font-semibold leading-tight">{it.diseaseName}</div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{new Date(it.timestamp).toLocaleDateString()}</span>
                  <span className="font-semibold text-primary">
                    {it.confidence.toFixed(1)}%
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
