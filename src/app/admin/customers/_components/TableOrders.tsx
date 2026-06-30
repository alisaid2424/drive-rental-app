import { DollarSign, CheckCircle2, Clock, Trash2 } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { orders } from "@/constants/data";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ViewDetailsButton from "./ViewDetailsButton";

const TableOrders = () => {
  return (
    <section className="bg-white/60 backdrop-blur-3xl rounded-[2rem] overflow-hidden border border-white/60 shadow-xl shadow-rose-500/5">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="bg-accent">
              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Customer
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Vehicle
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Date
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Revenue
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-center">
                Actions
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-border/50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-accent/30 transition-colors"
              >
                {/* Customer */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 text-primary flex items-center justify-center font-black text-xs border border-white shadow-sm">
                      {order.customerName
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div>
                      <p className="text-sm font-black text-slate-900 capitalize">
                        {order.customerName}
                      </p>

                      <p className="text-[10px] font-bold text-slate-400">
                        {order.customerEmail}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                      <Image
                        src={order.vehicle.image}
                        alt={order.vehicle.name}
                        className="w-full h-full object-cover"
                        width={200}
                        height={100}
                        loading="eager"
                        priority
                      />
                    </div>

                    <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                      {order.vehicle.name}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-5 text-sm text-slate-600 ">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>

                {/* Revenue */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <DollarSign className="size-4 text-emerald-500" />
                    {order.amount.toLocaleString()}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                      order.status === "Completed" ||
                      order.status === "Confirmed" ||
                      order.status === "Active"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : "bg-amber-50 text-amber-600 border-amber-200"
                    }`}
                  >
                    {order.status === "Completed" ||
                    order.status === "Confirmed" ||
                    order.status === "Active" ? (
                      <CheckCircle2 className="size-3" />
                    ) : (
                      <Clock className="size-3" />
                    )}

                    {order.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <ViewDetailsButton order={order} />

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-9 h-9 rounded-full border-slate-200 hover:bg-red-50 hover:border-red-200"
                    >
                      <Trash2 className="size-4 text-red-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t px-6 py-4 bg-background/40">
        <span className="text-sm text-muted-foreground">
          Showing {orders.length} of {orders.length} Orders
        </span>

        <Pagination className="w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default TableOrders;
