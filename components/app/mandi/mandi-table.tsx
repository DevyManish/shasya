"use client";
import React, { useEffect, useState } from "react";

interface MandiRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  grade: string;
  arrival_date: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

interface ApiResponse {
  records: MandiRecord[];
}

export default function MandiPrices() {
  const [data, setData] = useState<MandiRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json"
    )
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        setData(json.records || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!data.length) return <p className="p-4">No data available</p>;

  // Group by State + District
  const grouped = data.reduce<Record<string, MandiRecord[]>>((acc, item) => {
    const key = `${item.state} - ${item.district}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div className="p-6">
      {Object.entries(grouped).map(([location, records], idx) => (
        <div key={idx} className="mb-10">
          {/* State and District */}
          <h2 className="text-lg font-bold mb-2">{location}</h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Market</th>
                  <th className="border px-4 py-2">Commodity</th>
                  <th className="border px-4 py-2">Variety</th>
                  <th className="border px-4 py-2">Grade</th>
                  <th className="border px-4 py-2">Arrival Date</th>
                  <th className="border px-4 py-2">Min Price</th>
                  <th className="border px-4 py-2">Max Price</th>
                  <th className="border px-4 py-2">Modal Price</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{rec.market}</td>
                    <td className="border px-4 py-2">{rec.commodity}</td>
                    <td className="border px-4 py-2">{rec.variety}</td>
                    <td className="border px-4 py-2">{rec.grade}</td>
                    <td className="border px-4 py-2">{rec.arrival_date}</td>
                    <td className="border px-4 py-2">{rec.min_price}</td>
                    <td className="border px-4 py-2">{rec.max_price}</td>
                    <td className="border px-4 py-2">{rec.modal_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
