"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Mail, Settings, Send, Printer } from "lucide-react";
import { useState } from "react";

const chartData = [
  { month: "Jan", sales: 186, prints: 80 },
  { month: "Feb", sales: 305, prints: 200 },
  { month: "Mar", sales: 237, prints: 120 },
  { month: "Apr", sales: 73, prints: 190 },
  { month: "May", sales: 209, prints: 130 },
  { month: "Jun", sales: 214, prints: 140 },
];

const inventoryData = [
  { id: "FIL-001", name: "Matte Black PETG", stock: 45, status: "Low", type: "Filament" },
  { id: "FIL-002", name: "Translucent Gray PC", stock: 120, status: "Good", type: "Filament" },
  { id: "PRT-001", name: "Humbucker Pickups (Gold)", stock: 12, status: "Critical", type: "Hardware" },
  { id: "PRT-002", name: "Single Coil Set (White)", stock: 34, status: "Good", type: "Hardware" },
];

export function DashboardView() {
  const [emailFocus, setEmailFocus] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      
      {/* Sales and Prints Chart */}
      <Card className="col-span-1 lg:col-span-4 bg-white/70 backdrop-blur-sm border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Producción & Ventas</CardTitle>
          <CardDescription>
            Mostrando el rendimiento de los laboratorios en los últimos 6 meses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPrints" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#666666" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#666666" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" stroke="#666666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E5E7EB", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                  itemStyle={{ color: "#0A0A0A", fontWeight: 500 }}
                />
                <Area type="monotone" dataKey="sales" stroke="#0A0A0A" strokeWidth={2} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="prints" stroke="#666666" strokeWidth={2} fillOpacity={1} fill="url(#colorPrints)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Visual Email Editor (Resend Mockup) */}
      <Card className="col-span-1 lg:col-span-3 bg-white border-border shadow-md overflow-hidden flex flex-col">
        <CardHeader className="bg-primary text-primary-foreground pb-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <CardTitle className="text-lg">Broadcast (Resend)</CardTitle>
            </div>
            <Settings className="h-4 w-4 opacity-70 cursor-pointer hover:opacity-100 transition-opacity" />
          </div>
          <CardDescription className="text-primary-foreground/70 mt-1">
            Editor visual estido Notion para newsletters.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
          <div className="p-4 border-b border-border bg-secondary/50">
            <input 
              className="w-full bg-transparent border-none text-sm font-medium focus:ring-0 focus:outline-none placeholder:text-muted-foreground" 
              placeholder="Asunto: Nueva Colección de Filamentos Translucidos"
            />
          </div>
          <div className={`flex-1 p-6 transition-colors duration-300 ${emailFocus ? 'bg-secondary/10' : 'bg-transparent'}`}>
            <textarea 
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              className="w-full h-full min-h-[150px] resize-none border-none bg-transparent focus:ring-0 focus:outline-none text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50"
              placeholder="Escribe el cuerpo del correo aquí... Presiona '/' para comandos."
            />
          </div>
          <div className="p-4 border-t border-border flex justify-between items-center bg-white">
            <span className="text-xs text-muted-foreground font-mono">Borrador guardado 10:42 AM</span>
            <Button size="sm" className="shadow-lg shadow-primary/20">
              <Send className="h-3 w-3 mr-2" />
              Enviar Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card className="col-span-1 lg:col-span-7 bg-white/70 backdrop-blur-sm shadow-sm md:mt-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Inventario de Laboratorio</CardTitle>
              <CardDescription>Control de materiales y hardware para manufactura.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Reporte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre del Material</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-xs">{item.id}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.type}</TableCell>
                  <TableCell>{item.stock} uds.</TableCell>
                  <TableCell className="text-right">
                    <Badge variant={item.status === "Good" ? "secondary" : item.status === "Low" ? "outline" : "destructive"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
    </div>
  );
}
