import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // shadcn/ui Card component

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts";

// Updated component: Now N, P, K bars have specific colors using <Cell> elements.

const dataNPK = [
  { name: "N (kg/ha)", value: 230, color: "#fb923c" }, // Orange 400
  { name: "P₂O₅ (kg/ha)", value: 60, color: "#60a5fa" }, // Blue 400
  { name: "K₂O (kg/ha)", value: 280, color: "#4ade80" }, // Green 400
];

const radarData = [
  { subject: "pH", value: 7.0, fullMark: 14 },
  { subject: "EC (dS/m)", value: 0.35, fullMark: 5 },
  { subject: "Temp (°C)", value: 30, fullMark: 50 },
  { subject: "Humidity (%)", value: 83, fullMark: 100 },
  { subject: "Org. Matter (%)", value: 0.8, fullMark: 5 },
];

export default function HealthChart({ className = "", compact = false }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">
            NPK — Available Nutrients (0–15 cm)
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataNPK}
              margin={{ top: 20, right: 12, left: 12, bottom: 12 }}
            >
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="kg/ha" barSize={48}>
                {dataNPK.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm md:text-base">
            Environmental & Soil Properties — September (Nadia)
          </CardTitle>
        </CardHeader>
        <CardContent
          className={`h-72 flex items-center justify-center ${
            compact ? "p-2" : "p-4"
          }`}
        >
          <div className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius={"70%"}
                data={radarData}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Observed"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.4}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
