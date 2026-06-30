import { Car, CalendarCheck, Wrench, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { carsall } from "@/constants/data";

export function FleetStats() {
  const totalVehicles = carsall.length;
  const activeRentals = carsall.filter((v) => v.status === "On Rental").length;
  const inMaintenance = carsall.filter(
    (v) => v.status === "Maintenance"
  ).length;

  const stats = [
    {
      title: "Total Vehicles",
      value: totalVehicles,
      progress: 85,
      icon: Car,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Active Rentals",
      value: activeRentals,
      progress: 90,
      icon: CalendarCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Maintenance",
      value: inMaintenance,
      progress: 10,
      icon: Wrench,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      title: "Avg. Daily Revenue",
      value: "$12,450",
      progress: 72,
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      trend: "+12% this week",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="group overflow-hidden border-white/60 bg-white/60 backdrop-blur-3xl rounded-[2rem] shadow-xl shadow-slate-200/40 hover:shadow-primary/10 transition-all duration-300"
          >
            <CardContent className="px-4 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground font-black">
                    {stat.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-slate-900">
                    {stat.value}
                  </h3>
                </div>

                <div
                  className={`h-10 w-10 rounded-2xl flex items-center justify-center ${stat.bg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>

              <Progress value={stat.progress} className="h-2 rounded-full" />

              {stat.trend ? (
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  {stat.trend}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Fleet performance indicator
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
