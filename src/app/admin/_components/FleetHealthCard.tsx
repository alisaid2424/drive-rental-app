import { CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fleetHealthData = [
  { label: "Luxury Sedans", value: 85 },
  { label: "Convertibles", value: 62 },
  { label: "SUVs", value: 48 },
];

export function FleetHealthCard() {
  return (
    <Card className="glass-panel">
      <CardHeader>
        <CardTitle className="text-sm sm:text-lg font-black text-slate-900 capitalize tracking-tight">
          Fleet Health
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col h-full space-y-6">
        {fleetHealthData.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                {item.label}
              </span>

              <span className="text-xs font-bold text-primary">
                {item.value}%
              </span>
            </div>

            <Progress value={item.value} className="h-2 rounded-full" />
          </div>
        ))}

        {/* Status */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t ">
          <CheckCircle className="h-5 w-5 text-emerald-500" />

          <div>
            <p className="text-sm font-semibold">Maintenance Clear</p>

            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
