import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/result-card";
import { getHistoryItem, type HistoryItem } from "@/lib/history-store";

export const Route = createFileRoute("/result/$id")({
  head: () => ({
    meta: [
      { title: "Prediction Result — PlantGuard AI" },
      { name: "description", content: "View the AI prediction for an uploaded leaf image." },
    ],
  }),
  component: Result,
});

function Result() {
  const { id } = Route.useParams();
  const [item, setItem] = useState<HistoryItem | null | undefined>(undefined);

  useEffect(() => {
    setItem(getHistoryItem(id) ?? null);
  }, [id]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <Button asChild variant="ghost" size="sm" className="mb-6">
        <Link to="/detect">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to detector
        </Link>
      </Button>

      {item === undefined ? (
        <div className="py-20 text-center text-muted-foreground">Loading result…</div>
      ) : item === null ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center">
          <h2 className="font-display text-xl font-semibold">Result not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            This prediction is no longer in your local history.
          </p>
          <Button asChild className="mt-5">
            <Link to="/detect">Analyze a new image</Link>
          </Button>
        </div>
      ) : (
        <ResultCard item={item} />
      )}
    </div>
  );
}
