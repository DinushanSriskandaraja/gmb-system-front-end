import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { supabase } from "@/lib/supabaseClient";

export default async function Dashboard() {
  let jobs: any[] = [];
  let customers: any[] = [];
  let orders: any[] = [];

  try {
    const { getJobs } = await import('@/lib/db/jobs');
    const { getCustomers } = await import('@/lib/db/customers');
    const { getOrders } = await import('@/lib/db/orders');
    jobs = await getJobs();
    customers = await getCustomers();
    orders = await getOrders();
  } catch (error) {
    console.error("Failed to load dashboard data", error);
  }

  return <DashboardClient jobs={jobs} customers={customers} orders={orders} />;
}
