import { allbookings, carsall } from "@/constants/data";
import { Calendar, DollarSign, Car, ArrowRight } from "lucide-react";
import { RevenueChart } from "./_components/revenue-chart";
import { FleetHealthCard } from "./_components/FleetHealthCard";
import Link from "next/link";
import { Heading } from "@/components/Heading";
import TableBookings from "./_components/TableBookings";

export default async function AdminDashboardPage() {
  const totalBookings = allbookings.length;
  const totalRevenue = allbookings.reduce(
    (sum: number, b: any) => sum + (b.totalAmount || 0),
    0
  );
  const activeFleetCount = carsall.filter(
    (c: any) => c.status === "On Rental"
  ).length;
  const totalFleetCount = carsall.length;

  const analyticsCards = [
    {
      title: "Total Bookings",
      value: totalBookings.toLocaleString(),
      icon: Calendar,
      trend: "+12.5%",
      trendColor: "text-emerald-500",
      path: "M0 35 Q 25 35 40 20 T 100 5",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: "+8.2%",
      trendColor: "text-emerald-500",
      path: "M0 30 Q 20 10 50 25 T 100 15",
    },
    {
      title: "Active Fleet",
      value: `${activeFleetCount}/${totalFleetCount}`,
      icon: Car,
      trend: "Stable",
      trendColor: "text-slate-400",
      path: "M0 20 L 20 20 L 40 20 L 60 20 L 80 20 L 100 20",
    },
  ];

  return (
    <div className="space-y-8 mb-7">
      <Heading
        title="Fleet Analytics"
        subtitle="Real-time performance metrics and revenue overview for your luxury
          collection."
        align="left"
      />

      {/* Bento Analytics Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white/60 backdrop-blur-3xl rounded-[2rem] p-6 border border-white/60 shadow-xl shadow-rose-500/5 group hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-primary">
                  <Icon size={20} />
                </div>

                <div className="text-right">
                  <span className={`${card.trendColor} text-[10px] font-black`}>
                    {card.trend}
                  </span>

                  <div className="w-12 h-6 mt-1">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 100 40"
                      fill="none"
                    >
                      <path d={card.path} stroke="#b90538" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              </div>

              <h3 className="text-slate-400 font-black text-[9px] capitalize tracking-[0.15em]">
                {card.title}
              </h3>

              <p className="text-2xl font-black text-slate-900 mt-1">
                {card.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <RevenueChart />

        {/* Fleet Health */}
        <FleetHealthCard />
      </div>

      {/* Recent Bookings Table */}
      <div className="flex flex-col gap-5">
        <div className="px-4 pt-2 flex justify-between items-center bg-transparent">
          <h2 className="text-xl font-bold tracking-tight">Recent Bookings</h2>

          <Link
            href="#"
            className="group flex items-center gap-2 font-semibold text-primary"
          >
            View All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <TableBookings />
      </div>
    </div>
  );
}
