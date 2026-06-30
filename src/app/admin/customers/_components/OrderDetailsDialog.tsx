"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, CheckCircle2, Clock, DollarSign, Mail, User } from "lucide-react";

interface OrderDetailsDialogProps {
  order: any;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsDialog({
  order,
  isOpen,
  onClose,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  const isCompleted =
    order.status === "Completed" ||
    order.status === "Confirmed" ||
    order.status === "Active";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-3xl p-0 overflow-hidden border-none rounded-4xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <DialogTitle className="text-2xl font-black">
              Order Details
            </DialogTitle>

            <p className="text-xs text-slate-400 mt-1">Order #{order.id}</p>
          </div>

          <Button
            size="icon-lg"
            onClick={onClose}
            className="group bg-white shadow-sm text-slate-400 hover:text-rose-500 rounded-xl hover:bg-white transition-all"
          >
            <X className="size-5 group-hover:rotate-180 transition duration-300" />
          </Button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2">
          {/* Customer */}
          <div className="p-6 border-r">
            <h3 className="font-black text-slate-900 mb-6">
              Customer Information
            </h3>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="size-5 text-rose-500" />

                <div>
                  <p className="text-xs text-slate-400">Customer Name</p>
                  <p className="font-semibold">{order.customerName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-5 text-rose-500" />

                <div>
                  <p className="text-xs text-slate-400">Email Address</p>
                  <p className="font-semibold">{order.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="size-5 text-emerald-500" />

                <div>
                  <p className="text-xs text-slate-400">Revenue</p>
                  <p className="font-semibold">
                    ${order.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle */}
          <div className="p-6 bg-slate-50">
            <h3 className="font-black text-slate-900 mb-6">
              Vehicle Information
            </h3>

            <Image
              src={order.vehicle.image}
              alt={order.vehicle.name}
              width={600}
              height={300}
              className="w-full h-52 object-cover rounded-2xl"
              loading="eager"
              priority
            />

            <div className="mt-5">
              <h4 className="text-lg font-black">{order.vehicle.name}</h4>

              <p className="text-sm text-slate-500 mt-2">
                Ordered on{" "}
                {new Date(order.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mt-4 text-xs font-bold ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Clock className="size-4" />
                )}

                {order.status}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-5 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
