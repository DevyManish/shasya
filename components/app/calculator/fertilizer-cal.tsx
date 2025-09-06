"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormData = {
  area: number;
  shape: string;
  soilType: string;
  crop: string;
  npk: { n: number; p: number; k: number };
  humidity: number;
  temperature: number;
  ph: number;
  salinity: number;
};

type FertilizerRecommendation = {
  type: string;
  quantity: string;
};

export default function FertilizerCalculator() {
  const [formData, setFormData] = useState<FormData>({
    area: 1,
    shape: "",
    soilType: "new alluvial",
    crop: "rice",
    npk: { n: 0, p: 0, k: 0 },
    humidity: 60,
    temperature: 25,
    ph: 6.5,
    salinity: 1.2,
  });

  const [result, setResult] = useState<FertilizerRecommendation[] | null>(null);

  const cropRequirements: Record<string, { n: number; p: number; k: number }> = {
    rice: { n: 100, p: 40, k: 40 },
    wheat: { n: 120, p: 50, k: 30 },
    maize: { n: 150, p: 60, k: 50 },
  };

  const soilContribution: Record<
    string,
    { n: number; p: number; k: number }
  > = {
    "new alluvial": { n: 20, p: 10, k: 15 },
    "old alluvial": { n: 15, p: 10, k: 20 },
    "black soil": { n: 25, p: 15, k: 30 },
    "red soil": { n: 10, p: 5, k: 10 },
  };

  const fertilizers = {
    urea: { n: 0.46, p: 0, k: 0 },
    dap: { n: 0.18, p: 0.46, k: 0 },
    mop: { n: 0, p: 0, k: 0.6 },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    if (["n", "p", "k"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        npk: { ...prev.npk, [name]: Number(value) },
      }));
    } else if (
      ["area", "humidity", "temperature", "ph", "salinity"].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateFertilizer = (): void => {
    const { soilType, crop, npk, area } = formData;
    const cropReq = cropRequirements[crop] || { n: 100, p: 40, k: 40 };
    const soilContrib = soilContribution[soilType] || { n: 15, p: 10, k: 15 };

    const neededN = Math.max(0, cropReq.n - soilContrib.n - npk.n);
    const neededP = Math.max(0, cropReq.p - soilContrib.p - npk.p);
    const neededK = Math.max(0, cropReq.k - soilContrib.k - npk.k);

    const ureaKg = ((neededN / fertilizers.urea.n) * area).toFixed(1);
    const dapKg = ((neededP / fertilizers.dap.p) * area).toFixed(1);
    const mopKg = ((neededK / fertilizers.mop.k) * area).toFixed(1);

    setResult([
      { type: "Urea (46% N)", quantity: `${ureaKg} kg/ha` },
      { type: "DAP (18-46-0)", quantity: `${dapKg} kg/ha` },
      { type: "MOP (0-0-60)", quantity: `${mopKg} kg/ha` },
    ]);
  };

  return (
    <Card className="max-w-xl mx-auto mt-6 p-4">
      <CardHeader>
        <CardTitle>Fertilizer Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="number"
          name="area"
          placeholder="Area (hectares)"
          value={formData.area}
          onChange={handleChange}
        />

        <Input
          type="text"
          name="shape"
          placeholder="Shape of land"
          value={formData.shape}
          onChange={handleChange}
        />

        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, soilType: value }))
          }
          defaultValue={formData.soilType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new alluvial">New Alluvial</SelectItem>
            <SelectItem value="old alluvial">Old Alluvial</SelectItem>
            <SelectItem value="black soil">Black Soil</SelectItem>
            <SelectItem value="red soil">Red Soil</SelectItem>
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, crop: value }))
          }
          defaultValue={formData.crop}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select crop" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rice">Rice</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="maize">Maize</SelectItem>
          </SelectContent>
        </Select>

        <div className="grid grid-cols-3 gap-2">
          <Input
            type="number"
            name="n"
            placeholder="N"
            value={formData.npk.n}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="p"
            placeholder="P"
            value={formData.npk.p}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="k"
            placeholder="K"
            value={formData.npk.k}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            step="0.1"
            name="humidity"
            placeholder="Humidity (%)"
            value={formData.humidity}
            onChange={handleChange}
          />
          <Input
            type="number"
            step="0.1"
            name="temperature"
            placeholder="Temperature (°C)"
            value={formData.temperature}
            onChange={handleChange}
          />
          <Input
            type="number"
            step="0.1"
            name="ph"
            placeholder="pH"
            value={formData.ph}
            onChange={handleChange}
          />
          <Input
            type="number"
            step="0.1"
            name="salinity"
            placeholder="Salinity (dS/m)"
            value={formData.salinity}
            onChange={handleChange}
          />
        </div>

        <Button onClick={calculateFertilizer} className="w-full">
          Calculate Fertilizer
        </Button>

        {result && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Recommendations:</h2>
            <ul className="list-disc pl-6 space-y-1">
              {result.map((rec, i) => (
                <li key={i}>
                  {rec.type} - <span className="font-medium">{rec.quantity}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
