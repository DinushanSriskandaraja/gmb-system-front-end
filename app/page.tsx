export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Dashboard
          </h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards to show layout */}
        <div className="overflow-hidden rounded-xl bg-card shadow-sm border border-border">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-md bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">12</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-muted-foreground">Active Jobs</dt>
                  <dd>
                    <div className="text-lg font-medium text-foreground">In Progress</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
