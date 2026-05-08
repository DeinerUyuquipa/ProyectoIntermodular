import { DashboardView } from "@/components/admin/DashboardView";

export const metadata = {
  title: "Admin Dashboard | REBO 3D",
  description: "Smart admin dashboard for managing REBO 3D operations.",
};

export default function AdminPage() {
  return (
    <div className="flex-1 w-full bg-secondary/30 min-h-[calc(100vh-64px)] p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Smart Dashboard</h1>
          <p className="text-muted-foreground">General overview of lab operations, inventory, and communications.</p>
        </div>
        <DashboardView />
      </div>
    </div>
  );
}
