import { Metadata } from "next";
import { Users, ShoppingBag, Settings, Activity } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Panel | Rebo3D",
  description: "Panel de control de administración de Rebo3D",
};

export default function AdminPage() {
  return (
    <div className="flex-1 w-full bg-muted/20 min-h-[80vh]">
      <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-8">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Panel de Control (Admin)</h1>
          <p className="text-muted-foreground mt-2">Visión general de tu tienda y usuarios.</p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: "Usuarios Totales", value: "124", icon: Users, color: "text-blue-500" },
            { title: "Ventas este Mes", value: "32", icon: ShoppingBag, color: "text-emerald-500" },
            { title: "Tráfico (Visitas)", value: "1,432", icon: Activity, color: "text-amber-500" },
            { title: "Configuración", value: "Ajustes", icon: Settings, color: "text-purple-500" },
          ].map((stat, index) => (
            <div key={index} className="bg-card border shadow-sm rounded-xl p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for Data Table */}
        <div className="bg-card border shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Últimos Registros (Demo)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">ID</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3 rounded-tr-lg">Fecha</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="px-6 py-4 font-medium text-foreground">1</td>
                  <td className="px-6 py-4">admin@rebo3d.com</td>
                  <td className="px-6 py-4"><span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-bold">Admin</span></td>
                  <td className="px-6 py-4">Hoy</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="px-6 py-4 font-medium text-foreground">2</td>
                  <td className="px-6 py-4">cliente@gmail.com</td>
                  <td className="px-6 py-4"><span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs font-bold">Customer</span></td>
                  <td className="px-6 py-4">Ayer</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
