import {
  IconChartAreaLine,
  IconMapPin,
  IconMeterSquare,
} from "@tabler/icons-react";
import { Card, CardHeader, CardDescription, CardTitle } from "../ui/card";
import HealthChart from "./health-chart";

const SoilHealth = () => {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold tabular-nums @[250px]/card:text-3xl">
          Soil Health
        </CardTitle>
        <CardDescription>Last uploaded 2 days ago.</CardDescription>
        <div>
          <div className="flex items-center">
            <div className="mt-0.5">
              <IconMapPin size={15} />
            </div>
            <p className="ml-1">
              Location:{" "}
              <span className="text-muted-foreground">
                23.3805° N, 88.5243° E
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <div className="mt-0.5">
              <IconMeterSquare size={16} />
            </div>
            <p className="ml-1">
              Area:{" "}
              <span className="text-muted-foreground">
                21 bigha {"≈ 2.81 ha"}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <div className="mt-0.5">
              <IconChartAreaLine size={16} />
            </div>
            <p className="ml-1">
              Soil type:{" "}
              <span className="text-muted-foreground">
                New alluvial, loamy to sandy-loam, neutral pH, low–medium
                fertility
              </span>
            </p>
          </div>
        </div>

        <div className="py-2">
          <HealthChart />
        </div>
      </CardHeader>
    </Card>
  );
};

export default SoilHealth;
