export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-slate-800 dark:border-t-slate-100" />
        <p className="text-sm font-medium">Loading module...</p>
      </div>
    </div>
  );
}
