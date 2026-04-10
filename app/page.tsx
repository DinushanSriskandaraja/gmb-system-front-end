import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { supabase } from "@/lib/supabaseClient";

export default async function Dashboard() {
  let jobs = [];
  let customers = [];
  let orders = [];

  try {
    const [jobsRes, customersRes, ordersRes] = await Promise.all([
      supabase.from('enquiries').select('*, customer:customers(*)').eq('is_job', true),
      supabase.from('customers').select('*').order('created_at', { ascending: false }),
      supabase.from('orders').select('*, supplier:suppliers(*)').order('created_at', { ascending: false })
    ]);

    if (jobsRes.data) jobs = jobsRes.data;
    if (customersRes.data) customers = customersRes.data;
    if (ordersRes.data) orders = ordersRes.data;
  } catch (error) {
    console.error("Failed to load dashboard data", error);
  }

  return <DashboardClient jobs={jobs} customers={customers} orders={orders} />;
}
