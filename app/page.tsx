export default function Home() {
  const stats = [
    { label: "Active Jobs",       value: "12",  sub: "3 due this week",   accent: "bg-blue-500"   },
    { label: "Pending Quotes",    value: "5",   sub: "₹ 42,500 in pipeline", accent: "bg-violet-500" },
    { label: "Low Stock Items",   value: "3",   sub: "Needs restocking",   accent: "bg-amber-500"  },
    { label: "Customers",         value: "48",  sub: "6 new this month",   accent: "bg-emerald-500"},
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Good evening, Admin 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="relative overflow-hidden rounded-2xl bg-card border border-border p-5 shadow-sm hover:shadow-md transition-shadow group">
            <span className={`absolute -top-4 -right-4 h-20 w-20 rounded-full ${s.accent} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{s.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
            <span className={`absolute bottom-0 left-0 h-0.5 w-full ${s.accent} opacity-70`} />
          </div>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Recent Jobs</h2>
          <div className="space-y-3">
            {[
              { name: "Alice Smith",  type: "Roller Blinds", status: "Measuring",  color: "bg-blue-400"     },
              { name: "Bob Johnson",  type: "Venetian",      status: "Quoted",     color: "bg-violet-400"   },
              { name: "Diana Prince", type: "Shutters",      status: "Installed",  color: "bg-emerald-400"  },
            ].map((job) => (
              <div key={job.name} className="flex items-center justify-between rounded-xl bg-muted/50 px-4 py-3 hover:bg-muted transition-colors">
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${job.color}`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{job.name}</p>
                    <p className="text-xs text-muted-foreground">{job.type}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-muted-foreground">{job.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "New Customer",   href: "/customers",   color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"   },
              { label: "New Job",        href: "/jobs",        color: "text-violet-500 bg-violet-50 dark:bg-violet-900/20" },
              { label: "New Quote",      href: "/quotations",  color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20"  },
              { label: "Add Stock Item", href: "/stocks",      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"},
            ].map((a) => (
              <a key={a.label} href={a.href} className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all hover:scale-[1.02] ${a.color}`}>
                <span className="flex-1">{a.label}</span>
                <span>&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
