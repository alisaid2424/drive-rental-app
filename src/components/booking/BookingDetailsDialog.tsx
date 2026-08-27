"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, CheckCircle2, Download, Gauge, Settings, Fuel } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { formatBookingDateTime } from "@/lib/formatBookingDateTime";
import { BookingWithUserVehicle } from "@/types/booking";

interface BookingDetailsDialogProps {
  booking: BookingWithUserVehicle;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDetailsDialog({
  booking,
  isOpen,
  onClose,
}: BookingDetailsDialogProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="max-w-[90%] sm:max-w-md md:max-w-4xl bg-white border-none rounded-4xl shadow-2xl overflow-hidden max-h-[90vh] p-0"
      >
        <div className="flex flex-col h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-50 bg-[#fafafa] shrink-0">
            <div>
              <DialogTitle className="text-2xl font-black tracking-tighter capitalize text-slate-900">
                Reservation Dossier
              </DialogTitle>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">
                Ref: #{booking.id}
              </p>
            </div>

            <Button
              size="icon-lg"
              onClick={onClose}
              className="group bg-white shadow-sm text-slate-400 hover:text-rose-500 rounded-xl hover:bg-white transition-all"
            >
              <X className="size-5 group-hover:rotate-180 transition duration-300" />
            </Button>
          </div>

          {/* Scroll Area */}
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col md:flex-row">
              {/* Left Side */}
              <div className="flex-1 p-5 space-y-5 border-r border-slate-50">
                <div
                  className={`flex items-center gap-3 px-5 py-2 ${
                    booking.paymentStatus === "Paid"
                      ? "bg-green-50 text-green-600 border-green-100"
                      : "bg-amber-50 text-amber-600 border-amber-100"
                  } rounded-full w-fit border`}
                >
                  {booking.paymentStatus === "Paid" ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  )}

                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {booking.paymentStatus === "Paid"
                      ? "Confirmed Trip"
                      : "Pending Confirmation"}
                  </span>
                </div>

                <div className="group">
                  <Image
                    src={booking.vehicle.images[0]}
                    alt={booking.vehicle.name}
                    width={200}
                    height={200}
                    className="object-cover w-full h-52 rounded-md group-hover:scale-[1.03] transition-transform duration-700"
                  />

                  <div className="flex justify-between items-end mt-7 relative z-10">
                    <div>
                      <h2 className="text-xl font-black uppercase text-slate-900 leading-none">
                        {booking.vehicle.name}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                        {booking.vehicle.type}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-[0.3em] bg-rose-50 px-4 py-2 rounded-full border border-rose-100">
                        Elite Fleet Tier
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-[#fafafa] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-slate-50">
                    <Gauge size={22} className="text-rose-500 mb-2" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Seats
                    </span>
                    <span className="text-xs font-black text-slate-900 uppercase">
                      {booking.vehicle.seats}
                    </span>
                  </div>

                  <div className="bg-[#fafafa] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-slate-50">
                    <Settings size={22} className="text-rose-500 mb-2" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Transmission
                    </span>
                    <span className="text-[9px] font-black text-slate-900 uppercase">
                      {booking.vehicle.transmission}
                    </span>
                  </div>

                  <div className="bg-[#fafafa] p-6 rounded-[2rem] flex flex-col items-center justify-center text-center border border-slate-50">
                    <Fuel size={22} className="text-rose-500 mb-2" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      Fuel
                    </span>
                    <span className="text-xs font-black text-slate-900 uppercase">
                      {booking.vehicle.fuel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="w-full md:w-105 bg-[#fafafa] p-5 flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="space-y-6">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                      Logistic Timeline
                    </h3>

                    <div className="flex items-start gap-6">
                      <div className="flex flex-col items-center pt-1">
                        <div className="w-3.5 h-3.5 rounded-full bg-rose-500" />
                        <div className="w-0.5 h-14 bg-linear-to-b from-rose-500 to-slate-200 my-1" />
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-500" />
                      </div>

                      <div className="flex flex-col justify-between h-24">
                        <div>
                          <p className="text-base font-black uppercase text-slate-900">
                            {formatBookingDateTime(booking.pickupDate)}
                          </p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {booking.pickupLocation}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-base font-black uppercase text-slate-900">
                            {formatBookingDateTime(booking.dropoffDate)}
                          </p>

                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                            {booking.dropoffLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-900/5 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Base Rental Rate</span>
                      <span className="text-slate-900 font-black">
                        ${booking.vehicle.pricePerDay}.00
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Concierge Service</span>
                      <span className="text-slate-900 font-black">$120.00</span>
                    </div>

                    <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                      <span>Elite Protection</span>
                      <span className="text-slate-900 font-black">$250.00</span>
                    </div>

                    <hr className="bg-slate-50 w-full h-0.5 mt-7" />

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-xl font-black uppercase text-slate-900">
                        Total
                      </span>
                      <span className="text-2xl font-black text-rose-500">
                        ${booking.totalAmount}.00
                      </span>
                    </div>
                  </div>

                  <Button className="w-full h-16 bg-slate-900 text-white rounded-xl uppercase">
                    <Download size={18} />
                    Download Voucher
                  </Button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white p-6 text-center border-t border-slate-50 ">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Need help?
                <span className="text-rose-500 font-black cursor-pointer hover:underline ml-1 uppercase">
                  Elite Concierge
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
