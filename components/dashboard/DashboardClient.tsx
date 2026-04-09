"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Package, Users, ChevronRight, ArrowUpRight, TrendingUp } from "lucide-react";

const transition: any = { duration: 0.6, ease: "easeOut" };
const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition }
};

export function DashboardClient({ jobs, customers, orders }: { jobs: any[], customers: any[], orders: any[] }) {
  const [greeting, setGreeting] = useState("Good day");
  
  // Metrics
  const activeJobsCount = jobs.filter(j => j.status !== "Completed" && j.status !== "Installed").length;
  const completedJobsCount = jobs.filter(j => j.status === "Completed" || j.status === "Installed").length;
  const totalJobsCount = jobs.length;
  const jobProgress = totalJobsCount === 0 ? 0 : Math.round((completedJobsCount / totalJobsCount) * 100);

  const pendingOrdersCount = orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").length;
  const leadCustomersCount = customers.filter(c => c.status === "Lead").length;

  const todaysTasks = [
    ...jobs.filter(j => j.status !== "Completed" && j.status !== "Installed").slice(0, 2).map(j => ({
      id: j.id, type: "Job", title: `Job - ${j.customer?.name || "Unknown"}`, subtitle: j.id, status: j.status, time: "10:00 AM", color: "text-blue-500 bg-blue-500/10"
    })),
    ...customers.filter(c => c.status === "Lead").slice(0, 1).map(c => ({
      id: c.customer_id, type: "Measurement", title: "New Lead", subtitle: c.name, status: "Scheduled", time: "02:30 PM", color: "text-indigo-500 bg-indigo-500/10"
    }))
  ];

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
      {/* Header section */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-foreground flex items-center gap-3">
            {greeting}, Admin <motion.span animate={{ rotate: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block origin-bottom-right">👋</motion.span>
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Welcome back! You have <strong className="text-foreground font-semibold">{todaysTasks.length} tasks</strong> remaining today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold bg-card border border-border/50 px-5 py-2.5 rounded-2xl shadow-xl shadow-black/5 backdrop-blur-md">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </span>
        </div>
      </motion.div>

      {/* Overview Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-accent p-8 text-white shadow-2xl shadow-accent/20 group">
          <div className="absolute top-0 right-0 p-4 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <p className="font-bold text-indigo-100/80 uppercase tracking-widest text-xs mb-2">Active Projects</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black">{activeJobsCount}</h2>
              <span className="text-indigo-100/60 text-sm font-medium">Ongoing</span>
            </div>
            <div className="mt-8">
              <div className="flex justify-between text-xs mb-3 text-indigo-100/80 font-bold uppercase tracking-wider">
                <span>Success Rate: {jobProgress}%</span>
                <span>{completedJobsCount}/{totalJobsCount} Total</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-md overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${jobProgress}%` }} 
                  transition={{ duration: 1.5, ease: "circOut" }}
                  className="bg-white h-full rounded-full shadow-[0_0_12px_rgba(255,255,255,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>

        {[
          { label: "New Leads", value: leadCustomersCount, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10", sub: "Requires follow-up", alert: AlertCircle, alertColor: "text-emerald-500" },
          { label: "Pending Orders", value: pendingOrdersCount, icon: Package, color: "text-amber-500", bg: "bg-amber-500/10", sub: "Awaiting fulfillment", alert: Clock, alertColor: "text-amber-500" },
        ].map((stat, i) => (
          <div key={i} className="glass-card flex flex-col justify-between group cursor-default hover-lift">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">{stat.label}</p>
                <h2 className="text-4xl font-black text-foreground">{stat.value}</h2>
              </div>
              <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className={`mt-6 pt-6 border-t border-border/50 text-xs font-bold uppercase tracking-wider ${stat.alertColor} flex items-center gap-2`}>
              <stat.alert className="w-4 h-4" />
              {stat.sub}
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Agenda */}
        <motion.div variants={item} className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-2xl font-black text-foreground">Today's Agenda</h2>
            <Link href="/jobs" className="text-sm font-bold text-accent hover:text-indigo-500 transition-colors flex items-center gap-1 group">
              Full Schedule <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="glass-card !p-0 overflow-hidden shadow-2xl shadow-black/5">
            {todaysTasks.length > 0 ? (
              <div className="divide-y divide-border/50">
                {todaysTasks.map((task, idx) => (
                  <motion.div key={idx} whileHover={{ backgroundColor: "var(--muted)" }} className="p-6 flex items-start gap-6 transition-colors group cursor-pointer">
                    <div className="flex flex-col items-center justify-center min-w-[70px] py-1 border-r border-border/50">
                      <span className="text-sm font-black text-foreground">{task.time.split(' ')[0]}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1">{task.time.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] uppercase tracking-[0.1em] font-black px-2.5 py-1 rounded-lg ${task.color}`}>{task.type}</span>
                        </div>
                        <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">{task.title}</h4>
                        <p className="text-sm text-muted-foreground font-medium mt-1">{task.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-xl border border-border/80 bg-background text-muted-foreground">
                          {task.status}
                        </span>
                        <motion.button whileHover={{ scale: 1.1, backgroundColor: "rgb(16 185 129 / 0.1)" }} whileTap={{ scale: 0.9 }} className="p-2.5 rounded-xl text-muted-foreground hover:text-emerald-500 transition-colors border border-transparent hover:border-emerald-500/20">
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-16 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-xl font-black text-foreground">You're all set!</h3>
                <p className="text-muted-foreground font-medium mt-2 max-w-[280px]">Your schedule is clear. Take a moment to relax or plan ahead.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions & Recent Orders */}
        <motion.div variants={item} className="flex flex-col gap-8">
          <div className="glass-card shadow-2xl shadow-black/5">
            <h2 className="text-xl font-black text-foreground mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Enquiry",   href: "/customers",   color: "from-blue-500/10 to-blue-600/10 text-blue-600 border-blue-500/20 hover:border-blue-500/40" },
                { label: "Order",     href: "/orders",      color: "from-amber-500/10 to-amber-600/10 text-amber-600 border-amber-500/20 hover:border-amber-500/40"  },
                { label: "Job",       href: "/jobs",        color: "from-indigo-500/10 to-indigo-600/10 text-indigo-600 border-indigo-500/20 hover:border-indigo-500/40" },
                { label: "Stock",     href: "/stocks",      color: "from-emerald-500/10 to-emerald-600/10 text-emerald-600 border-emerald-500/20 hover:border-emerald-500/40"},
              ].map((a) => (
                <Link key={a.label} href={a.href} className={`flex flex-col items-center justify-center gap-3 rounded-2xl p-5 text-xs font-black uppercase tracking-widest transition-all border bg-gradient-to-br ${a.color} hover:-translate-y-1 hover:shadow-lg`}>
                  <ArrowUpRight className="w-5 h-5" />
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="glass-card flex-1 relative overflow-hidden shadow-2xl shadow-black/5">
            <h2 className="text-xl font-black text-foreground mb-6 relative z-10">Incoming Stock</h2>
            <div className="space-y-6 relative z-10">
              {orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").slice(0, 3).map(o => (
                <motion.div key={o.order_id} whileHover={{ x: 4 }} className="flex justify-between items-center gap-4 group">
                  <div className="bg-muted rounded-xl p-3 shrink-0 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{o.item || 'Order Product'}</p>
                    <p className="text-xs text-muted-foreground font-medium truncate mt-0.5">{o.supplier?.name || 'Unknown Supplier'}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-black text-foreground">{new Date(o.expected_delivery_date || o.created_at).toLocaleDateString()}</p>
                    <p className="text-[10px] text-accent font-black uppercase tracking-tighter mt-0.5">{o.status}</p>
                  </div>
                </motion.div>
              ))}
              {orders.filter(o => o.status === "Pending Order" || o.status === "Order Placed").length === 0 && (
                <p className="text-sm text-muted-foreground font-medium text-center py-8">No incoming stock expected.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
