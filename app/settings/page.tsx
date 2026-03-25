"use client";

import { useState } from "react";
import { 
  Building2, User, Bell, Palette, Globe, 
  ShieldCheck, Mail, Phone, MapPin, 
  Save, Camera, Languages, DollarSign,
  Cloud, Lock
} from "lucide-react";
import { Button } from "@/components/ui/Button";

type TabType = "company" | "profile" | "preferences" | "security";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("company");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const tabs = [
    { id: "company", label: "Company Profile", icon: Building2 },
    { id: "profile", label: "My Profile", icon: User },
    { id: "preferences", label: "Preferences", icon: Palette },
    { id: "security", label: "Security", icon: ShieldCheck },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your company information and personal preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? "bg-accent text-white shadow-md shadow-accent/20" 
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <tab.icon className="w-4 h-4 shrink-0" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "company" && (
            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" /> Company Identity
                </h3>
                
                <div className="flex flex-col sm:flex-row gap-8 mb-8 items-start sm:items-center">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed border-border group-hover:border-accent transition-colors overflow-hidden">
                      <Building2 className="w-10 h-10 text-muted-foreground opacity-30" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-accent text-white shadow-lg shadow-accent/30 hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium text-foreground text-center sm:text-left">Company Logo</h4>
                    <p className="text-xs text-muted-foreground text-center sm:text-left">Recommended format: PNG, JPG (max 2MB)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Business Name</label>
                    <input 
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                      defaultValue="GMB Curtain & Blind" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Registration Number (ABN)</label>
                    <input 
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                      defaultValue="45 125 456 789" 
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                        defaultValue="office@gmb.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                        defaultValue="+61 280 123 456" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Office Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                        defaultValue="Suite 24, Level 5, 201 Miller St, North Sydney" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "profile" && (
            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
               <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent" /> Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Full Name</label>
                    <input 
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                      defaultValue="Admin User" 
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Login Email</label>
                    <input 
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none disabled:opacity-50" 
                      disabled
                      defaultValue="admin@gmb.com" 
                    />
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-muted-foreground" /> Change Password
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input 
                      type="password"
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                      placeholder="Current Password" 
                    />
                    <input 
                      type="password"
                      className="w-full h-10 rounded-xl border border-border bg-background px-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none" 
                      placeholder="New Password" 
                    />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "preferences" && (
             <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Palette className="w-5 h-5 text-accent" /> System Localization
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Currency</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none appearance-none">
                            <option value="AUD">Australian Dollar (AUD)</option>
                            <option value="USD">US Dollar (USD)</option>
                            <option value="LKR">Sri Lankan Rupee (LKR)</option>
                          </select>
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground ml-1">Timezone</label>
                        <div className="relative">
                          <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <select className="w-full h-10 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none appearance-none">
                            <option value="SYD">(GMT+10:00) Sydney</option>
                            <option value="MEL">(GMT+10:00) Melbourne</option>
                            <option value="COL">(GMT+05:30) Colombo</option>
                          </select>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-border">
                    <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-muted-foreground" /> Notifications
                    </h4>
                    <div className="space-y-4">
                       <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 dark:bg-orange-950/30 flex items-center justify-center">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Email Alerts</p>
                            <p className="text-xs text-muted-foreground">Receive daily job summaries via email</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 bg-accent focus:outline-none">
                            <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                          </div>
                       </label>
                       <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer group">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 dark:bg-blue-950/30 flex items-center justify-center">
                            <Cloud className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Auto-Sync Data</p>
                            <p className="text-xs text-muted-foreground">Sync orders with suppliers automatically</p>
                          </div>
                          <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 bg-muted focus:outline-none">
                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                          </div>
                       </label>
                    </div>
                  </div>
                </div>
             </section>
          )}

          {activeTab === "security" && (
             <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-foreground">
                    <ShieldCheck className="w-5 h-5 text-accent" /> Security Overview
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">Manage how you and your team access the GMB System.</p>

                  <div className="space-y-4">
                     <div className="p-4 rounded-2xl border border-green-500/10 bg-green-500/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-green-900 dark:text-green-400">Two-factor Authentication (2FA)</p>
                          <p className="text-xs text-green-800/70 dark:text-green-500/70">Enabled via email authentication</p>
                        </div>
                        <button className="ml-auto text-xs font-bold text-green-700 hover:underline">Revoke</button>
                     </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <h4 className="text-sm font-bold text-foreground">Active Sessions</h4>
                    <div className="space-y-3">
                       {[
                         { browser: "Chrome on Windows", location: "Sydney, AU", current: true },
                         { browser: "Safari on iPhone", location: "Colombo, LK", current: false },
                       ].map((session, i) => (
                         <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                           <div className="flex items-center gap-3">
                             <MonitorPlay className="w-4 h-4 text-muted-foreground" />
                             <div>
                               <p className="text-sm font-medium">{session.browser}</p>
                               <p className="text-xs text-muted-foreground">{session.location} {session.current && "• Active Now"}</p>
                             </div>
                           </div>
                           {!session.current && <button className="text-xs font-bold text-red-500 hover:underline">Log out</button>}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
             </section>
          )}

          {/* Save Action */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-5 border border-border rounded-2xl shadow-sm gap-4 transition-all hover:shadow-md">
            <div>
              <p className="text-sm font-semibold text-foreground">Unsaved Changes</p>
              <p className="text-xs text-muted-foreground">Make sure to save your work before leaving.</p>
            </div>
            <Button 
               className="w-full sm:w-auto h-11 px-8 relative overflow-hidden" 
               onClick={handleSave}
               disabled={isSaving}
            >
              <div className={`flex items-center gap-2 transition-transform duration-300 ${isSaving ? "-translate-y-12" : "translate-y-0"}`}>
                <Save className="w-4 h-4" /> Save Preferences
              </div>
              <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${isSaving ? "translate-y-0" : "translate-y-12"}`}>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Re-using some icons that were not explicitly imported but exist in Lucide
function MonitorPlay(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <polygon points="10 8 10 12 13 10 10 8" />
    </svg>
  )
}
