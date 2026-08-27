"use client";

import { Pages } from "@/constants/enums";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PaymentConfirm = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace(Pages.MYBOOKINGS);
    }, 5000);
  }, [router]);

  return (
    <div className="element-center h-screen px-5">
      <div className="max-w-lg w-full bg-white backdrop-blur-3xl p-5 sm:p-12 rounded-lg sm:rounded-[2.5rem] shadow-2xl shadow-rose-500/5 border border-white/60 text-center">
        <div className="w-28 h-28 mx-auto mb-8">
          <Image
            src="/images/verified.gif"
            width={150}
            height={150}
            alt="Booking confirmed"
          />
        </div>
        <h2 className="text-xl sm:text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">
          Booking Confirmed!
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold mb-10">
          Your booking has been successfully confirmed. We&apos;ve sent a
          digital receipt and rental agreement to your email address.
        </p>
      </div>
    </div>
  );
};

export default PaymentConfirm;
