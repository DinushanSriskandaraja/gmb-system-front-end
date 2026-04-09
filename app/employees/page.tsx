"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Mail, ShieldAlert, MonitorPlay, X, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getEmployees, createEmployee, updateEmployee } from "@/lib/db/employees";
import { Employee } from "@/lib/db/types";

const roleColors: Record<string, string> = {
  Admin:        "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/20",
  Manager:      "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
  Sales:        "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  Installer:    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  Receptionist: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20 dark:bg-fuchsia-500/10 dark:text-fuchsia-400 dark:ring-fuchsia-500/20",
  Accountant:   "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
};

const roleOptions = ["Admin", "Manager", "Sales", "Installer", "Receptionist", "Accountant"];

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Sales", position: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error("Failed to load employees", err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (id: string, newRole: string) => {
    try {
      // Optimistic update
      setEmployees(prev => prev.map(e => e.id === id ? { ...e, role: newRole } : e));
      await updateEmployee(id, { role: newRole });
    } catch (err) {
      console.error("Failed to update role", err);
      // Revert on error (could implement if desired)
      fetchEmployees();
    }
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const newEmp = await createEmployee({
        name: formData.name,
        email: formData.email,
        password_hash: formData.password, // In a real app, hash this backend!
        role: formData.role,
        designation: formData.position || "Staff",
        phone: null,
        status: "Active",
        last_login: null
      });
      setEmployees([newEmp, ...employees]);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", password: "", role: "Sales", position: "" });
    } catch (err) {
      console.error("Failed to add employee", err);
      alert("Failed to create employee. Please ensure email is unique.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const visibleEmployees = employees.filter(e => {
    const matchesFilter = filter === "All" ? true : e.role === filter;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || 
                          e.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Team & Employees</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage system access, roles, and employee credentials.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Employee
        </Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Admin", "Receptionist", "Sales", "Installer", "Accountant"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border border-border px-3 py-1 text-xs font-medium transition hover:bg-muted hover:text-foreground ${filter === f ? 'bg-accent text-white border-accent' : 'bg-card text-muted-foreground'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="md:ml-auto relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search team…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full md:w-64 rounded-full border border-border bg-card pl-8 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="w-full py-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleEmployees.map((emp) => {
            const initials = emp.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().substring(0, 2);
            return (
              <EntityCard
                key={emp.id}
                initials={initials}
                title={emp.name}
                subtitle={emp.designation || "Staff"}
                badge={{ 
                  label: emp.role, 
                  color: roleColors[emp.role] || "bg-gray-50 text-gray-700 ring-gray-600/20",
                  options: roleOptions,
                  onValueChange: (val) => updateRole(emp.id, val)
                }}
                meta={[
                  { icon: Mail,         label: emp.email },
                  { icon: ShieldAlert,  label: `Access: ${emp.role} Level` },
                  { icon: MonitorPlay,  label: emp.last_login ? `Last Login: ${new Date(emp.last_login).toLocaleDateString()}` : "Last Login: Never" },
                ]}
                onClick={() => {}}
              />
            )
          })}
          {visibleEmployees.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No employees found.
            </div>
          )}
        </div>
      )}

      {/* Add Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h3 className="font-semibold text-lg text-foreground">Add New Employee</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddEmployee} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">Full Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <MonitorPlay className="w-4 h-4" /> Position / Job Title
                </label>
                <input 
                  required
                  type="text" 
                  value={formData.position}
                  onChange={e => setFormData({...formData, position: e.target.value})}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Senior Outbound Sales"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-4 h-4" /> Email Address (Login ID)
                </label>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="jane@gmb.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-4 h-4" /> Set Password
                </label>
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" /> Access Role
                </label>
                <select 
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                >
                  <option value="Admin">Admin (Full Access)</option>
                  <option value="Receptionist">Receptionist (Enquiries & Jobs)</option>
                  <option value="Sales">Sales (+ Paperworks, Quotes)</option>
                  <option value="Installer">Installer (+ Measurements, View Paperwork)</option>
                  <option value="Accountant">Accountant (View Orders, Jobs)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Employee"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
