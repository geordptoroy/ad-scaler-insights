import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Download, Calendar } from "lucide-react";

const mockBarData = [
  { name: "CasaDecor", spend: 5000000 },
  { name: "TechStore", spend: 3000000 },
  { name: "EduTech", spend: 2000000 },
  { name: "ModaFit", spend: 1500000 },
  { name: "NutriVida", spend: 1000000 },
  { name: "PetLove", spend: 800000 },
  { name: "AutoPeças", spend: 500000 },
];

const mockPieData = [
  { name: "Imagem", value: 45 },
  { name: "Vídeo", value: 35 },
  { name: "Carrossel", value: 20 },
];

const PIE_COLORS = ["hsl(0 0% 100%)", "hsl(0 0% 60%)", "hsl(0 0% 35%)"];

export default function Reports() {
  const [period, setPeriod] = useState("30d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Relatórios
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Análises consolidadas do mercado
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 bg-card border-border">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="7d">7 dias</SelectItem>
              <SelectItem value="30d">30 dias</SelectItem>
              <SelectItem value="90d">90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-border">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Top Anunciantes por Gasto
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockBarData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
              <XAxis
                type="number"
                stroke="hsl(0 0% 40%)"
                tick={{ fill: "hsl(0 0% 67%)", fontSize: 12 }}
                tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="hsl(0 0% 40%)"
                tick={{ fill: "hsl(0 0% 67%)", fontSize: 12 }}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 20%)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) =>
                  `R$ ${(value / 1000000).toFixed(2)}M`
                }
              />
              <Bar dataKey="spend" fill="hsl(0 0% 100%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-card border-border p-6">
          <h2 className="text-lg font-medium text-foreground mb-4">
            Distribuição por Tipo de Mídia
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockPieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                dataKey="value"
                stroke="hsl(0 0% 0%)"
                strokeWidth={2}
              >
                {mockPieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0 0% 7%)",
                  border: "1px solid hsl(0 0% 20%)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => `${value}%`}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {mockPieData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[i] }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
