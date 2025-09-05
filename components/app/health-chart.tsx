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
} from "recharts";

// A compact, single-file React component that shows:
//  - A bar chart for available N, P, K (kg/ha)
//  - A radar chart for environmental/soil properties (pH, EC, Temp, Humidity, OrgMatter)
// Data here is the "typical snapshot" for Nadia district in September (monsoon + sun).
// Feel free to replace the numbers with live props or data fetch.

const dataNPK = [
  { name: "N (kg/ha)", value: 230 },
  { name: "P₂O₅ (kg/ha)", value: 60 },
  { name: "K₂O (kg/ha)", value: 280 },
];

// Radar uses a normalized scale for pleasant plotting. We keep a mapping below
const radarData = [
  { subject: "pH", value: 7.0, fullMark: 14 }, // pH scale 0-14
  { subject: "EC (dS/m)", value: 0.35, fullMark: 5 }, // scale up to 5 dS/m for visibility
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
              <Bar dataKey="value" name="kg/ha" barSize={48} />
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
