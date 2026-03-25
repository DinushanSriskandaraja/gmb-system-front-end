"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail, Package, CalendarIcon, DollarSign, Store, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getOrder, getSupplier } from "@/lib/data";

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = getOrder(id);
  
  if (!order || order.id === "PO-NEW" && id !== "PO-NEW") {
    notFound();
  }

  const supplier = getSupplier(order.supplierId);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSendEmail = () => {
    setEmailStatus("sending");
    // Simulate API delay
    setTimeout(() => {
      setEmailStatus("sent");
    }, 1500);
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto gap-8 flex flex-col">
      {/* Header and Back Link */}
      <div>
        <Link href="/orders" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
              {order.initials}
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">Order {order.id}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  order.status === "Order Placed" ? "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30" :
                  order.status === "Pending Order" ? "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20" :
                  order.status === "Order Completed" ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20" :
                  "bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30"
                }`}>
                  {order.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  Supplier: {supplier.name}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="px-4"
              onClick={handleSendEmail}
              disabled={emailStatus !== "idle"}
            >
              <Mail className="mr-2 h-4 w-4" />
              {emailStatus === "idle" ? "Email Supplier" : emailStatus === "sending" ? "Sending..." : "Email Sent!"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Store className="w-24 h-24" />
            </div>
            <h3 className="font-semibold text-lg mb-4 text-foreground flex items-center">
              <Store className="w-5 h-5 mr-2 text-primary" />
              Supplier Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{supplier.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <a href={`mailto:${supplier.email}`} className="text-accent hover:underline">{supplier.email}</a>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p className="text-foreground">{supplier.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted-foreground ring-1 ring-inset ring-border mt-1">
                  {supplier.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4 text-foreground flex items-center">
              <Package className="w-5 h-5 mr-2 text-primary" />
              Order Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Items</p>
                  <p className="font-medium text-foreground">{order.item}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-600 shrink-0">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                  <p className="font-medium text-foreground">{order.amount}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order Date</p>
                  <p className="font-medium text-foreground">{order.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600 shrink-0">
                  <CalendarIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Delivery</p>
                  <p className="font-medium text-foreground">{order.expected}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
