"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, CheckCircle2, AlertCircle, Package, Users, Briefcase, ChevronRight } from "lucide-react";
import { getJobs, getCustomers, getOrders } from "@/lib/data";

export default function Dashboard() {
  const [greeting, setGreeting] = useState("Good day");
  
  const jobs = getJobs();
  const customers = getCustomers();
  const orders = getOrders();

  // Metrics
  const activeJobsCount = jobs.filter(j => j.status !== "Job Completed").length;
  const completedJobsCount = jobs.filter(j => j.status === "Job Completed").length;
  const totalJobsCount = jobs.length;
  const jobProgress = totalJobsCount === 0 ? 0 : Math.round((completedJobsCount / totalJobsCount) * 100);

  const pendingOrdersCount = orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").length;
  const leadCustomersCount = customers.filter(c => c.status === "Lead").length;

  // Mocking "Today's Agenda" by taking some active jobs/orders
  const todaysTasks = [
    ...jobs.filter(j => j.status !== "Job Completed").slice(0, 2).map(j => ({
      id: j.id, type: "Job", title: `${j.type} - ${j.location}`, subtitle: j.customer, status: j.status, time: "10:00 AM", color: "text-blue-500 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400"
    })),
    ...customers.filter(c => c.status === "Lead").slice(0, 1).map(c => ({
      id: c.id, type: "Measurement", title: c.enquiry, subtitle: c.name, status: "Scheduled", time: "02:30 PM", color: "text-violet-500 bg-violet-50 dark:bg-violet-500/10 dark:text-violet-400"
    }))
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            {greeting}, Admin <span className="animate-wave inline-block origin-bottom-right">👋</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            You have <strong className="text-foreground">{todaysTasks.length} tasks</strong> on your agenda today and <strong className="text-foreground">{pendingOrdersCount} orders</strong> arriving soon.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-medium bg-card border border-border px-4 py-2 rounded-xl shadow-sm">
          <Clock className="w-4 h-4 text-accent" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-md relative overflow-hidden group">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
            <Briefcase className="w-32 h-32" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="font-medium text-blue-100 mb-1">Active Jobs</p>
              <h2 className="text-4xl font-bold">{activeJobsCount}</h2>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-2 text-blue-100 font-medium">
                <span>Progress: {jobProgress}% completed</span>
                <span>{completedJobsCount}/{totalJobsCount} Jobs</span>
              </div>
              <div className="w-full bg-blue-900/40 rounded-full h-1.5 backdrop-blur-sm">
                <div className="bg-white rounded-full h-1.5 transition-all duration-1000" style={{ width: `${jobProgress}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">New Leads</p>
              <h2 className="text-3xl font-bold text-foreground">{leadCustomersCount}</h2>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-emerald-500/10 dark:text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-emerald-500" />
            Requires follow-up today
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Orders</p>
              <h2 className="text-3xl font-bold text-foreground">{pendingOrdersCount}</h2>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl dark:bg-amber-500/10 dark:text-amber-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            Awaiting supplier fulfillment
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Agenda */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Today's Agenda</h2>
            <Link href="/jobs" className="text-sm font-medium text-accent hover:underline flex items-center">
              View Calendar <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            {todaysTasks.length > 0 ? (
              <div className="divide-y divide-border">
                {todaysTasks.map((task, idx) => (
                  <div key={idx} className="p-5 flex items-start gap-4 hover:bg-muted/30 transition-colors group">
                    <div className="flex flex-col items-center justify-center min-w-[60px]">
                      <span className="text-xs font-bold text-foreground">{task.time.split(' ')[0]}</span>
                      <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{task.time.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md ${task.color}`}>
                            {task.type}
                          </span>
                        </div>
                        <h4 className="font-semibold text-foreground">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-border bg-background text-muted-foreground">
                          {task.status}
                        </span>
                        <button className="p-2 rounded-full hover:bg-emerald-50 hover:text-emerald-600 text-muted-foreground transition-colors dark:hover:bg-emerald-500/10">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3 opacity-20" />
                <p className="font-medium text-foreground">You are all caught up!</p>
                <p className="text-sm text-muted-foreground max-w-[200px] mt-1">There are no more tasks scheduled for today.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recent Orders */}
        <div className="flex flex-col gap-6">
          <div className="rounded-2xl border border-border bg-card shadow-sm p-5">
            <h2 className="font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Add Enquiry",   href: "/customers",   color: "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"   },
                { label: "New Order",     href: "/orders",      color: "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"  },
                { label: "Create Job",    href: "/jobs",        color: "bg-violet-50 text-violet-700 hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-400 dark:hover:bg-violet-500/20" },
                { label: "Inventory",     href: "/stocks",      color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"},
              ].map((a) => (
                <Link key={a.label} href={a.href} className={`flex flex-col items-center justify-center gap-2 rounded-xl p-4 text-xs font-semibold tracking-wide transition-all ${a.color}`}>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card shadow-sm p-5 flex-1 relative overflow-hidden">
            <h2 className="font-bold text-foreground mb-4 relative z-10">Incoming Stock</h2>
            <div className="space-y-4 relative z-10">
              {orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").slice(0, 3).map(o => (
                <div key={o.id} className="flex justify-between items-start gap-4">
                  <div className="bg-muted rounded-lg p-2.5 shrink-0 text-muted-foreground">
                    <Package className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{o.item}</p>
                    <p className="text-xs text-muted-foreground truncate">{o.supplier}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-foreground">{o.expected}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">{o.status}</p>
                  </div>
                </div>
              ))}
              {orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No incoming stock expected.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
