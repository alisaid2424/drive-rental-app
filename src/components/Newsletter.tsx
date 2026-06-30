import Image from "next/image";
import { Button } from "./ui/button";

const Newsletter = () => {
  return (
    <section className="container-custom py-20">
      <div className="bg-slate-950 rounded-3xl lg:rounded-[80px] p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-bold text-3xl md:text-4xl uppercase text-white mb-10 leading-[1.1] tracking-tighter">
              Join the Luxe <br /> Elite Club
            </h2>
            <p className="text-body-lg text-slate-400 mb-12 leading-relaxed max-w-xl">
              Get early access to our newest fleet additions and exclusive
              member-only pricing delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 text-left max-w-lg">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-md px-3 py-1 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="Your email address"
                type="email"
                autoComplete="off"
              />
              <Button className="px-12 py-6 uppercase shadow-xl shadow-primary/20">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="hidden lg:block relative group lg:ms-6">
            <div className="absolute -inset-4 bg-linear-to-r from-primary to-[#dc2c4f] rounded-[56px] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity" />

            <Image
              className="relative rounded-[48px] shadow-2xl border border-white/5 grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLAxBrUddirT7bvgYFFdGeLO70i1dbGcGCnjr5gQArNkRinjhdjeVacPe4dNcynfTt4IwpF441Bs4WdaEwt105TKwSswCB0LPR6lq7ffgy2T4mD9oNchK-69AfqCtFWKwhoD-SWni6vcMkOxXfUSOoYSjZ1K26CtG8M9RwATC6wluTDIXAp1ocRgalHjV9LetSv9e4TpIRv4qTjRpHEI2XJA16fE51q1X2fBoKEjyN9nZKxVI9horqOYpnT27u7mKL__6_Sx3HLqM"
              alt="Interior"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
