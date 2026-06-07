import { useCallback, useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onFile: (file: File, dataUrl: string) => void;
  file: { file: File; dataUrl: string } | null;
  onClear: () => void;
};

export function UploadDropzone({ onFile, file, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const f = files[0];
      if (!/image\/(jpe?g|png)/i.test(f.type)) {
        alert("Please upload a JPG, JPEG, or PNG image.");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => onFile(f, reader.result as string);
      reader.readAsDataURL(f);
    },
    [onFile],
  );

  if (file) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img
          src={file.dataUrl}
          alt={file.file.name}
          className="aspect-video w-full object-contain bg-muted/40"
        />
        <div className="flex items-center justify-between gap-3 border-t border-border bg-card px-4 py-3">
          <div className="flex min-w-0 items-center gap-2 text-sm">
            <ImageIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate font-medium">{file.file.name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">
              {(file.file.size / 1024).toFixed(0)} KB
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="mr-1 h-4 w-4" /> Remove
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-card p-8 text-center transition-colors",
        drag
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/60 hover:bg-secondary/40",
      )}
    >
      <div className="grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
        <Upload className="h-6 w-6" />
      </div>
      <div>
        <div className="font-medium">Drop a leaf image here</div>
        <div className="text-sm text-muted-foreground">
          or click to browse · JPG, PNG up to a few MB
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
