const KEY = "pdd_history_v1";

export type HistoryItem = {
  id: string;
  imageDataUrl: string;
  fileName: string;
  diseaseId: string;
  diseaseName: string;
  status: "healthy" | "diseased";
  confidence: number;
  timestamp: number;
};

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryItem[];
  } catch {
    return [];
  }
}

export function getHistoryItem(id: string): HistoryItem | undefined {
  return getHistory().find((h) => h.id === id);
}

export function saveHistory(item: HistoryItem) {
  if (typeof window === "undefined") return;
  const items = [item, ...getHistory()].slice(0, 50);
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
