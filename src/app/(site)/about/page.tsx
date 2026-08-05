import { Button } from "@/components/ui/button";
import { ArrowRight, Diamond, Gauge, Leaf } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="container-custom relative py-32 overflow-hidden z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 text-primary font-black text-[10px] tracking-widest mb-6 uppercase border border-rose-100 shadow-sm backdrop-blur-sm">
              ESTABLISHED 2012
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] mb-6 uppercase tracking-tighter">
              Redefining the{" "}
              <span className="bg-linear-to-r from-primary to-rose-400 bg-clip-text text-transparent">
                Art of Travel
              </span>
              .
            </h2>
            <p className="text-lg  text-slate-500 mb-8 max-w-xl font-medium leading-relaxed">
              At LuxeDrive, we don&lsquo;t just rent cars; we curate
              experiences. Our journey began with a single vision: to transform
              every road trip into a moment of pure luxury and effortless
              elegance.
            </p>
            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">12k+</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Global Clients
                </span>
              </div>
              <div className="w-px h-12 bg-slate-200 mx-4" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary">450+</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Premium Vehicles
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700 border border-white/40">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhaOaFB7RJSrvX5fdZRS-S8JDHX9xP71dclNC0D6JDGVNRuVMpvgbFvtVLLJxyZh0wj4Z-eE__IKD8vg5iYcmVhpgB16MABHq_avcvWI6si6-krjAdjYfx6QWkKHgzc0OJD92lU27SNjxKbBT9rDR2PaXy2oD5SB7pe2mCSw7TniAGj9kdkM09gunduCBRtxuw05nmozkpVyBGzwbnRq_PwT5GhG6ZRFeYUEtgRAbprI4ySUGMBduAbHqbILzcp4xATnC1GKmmrbg"
                alt="Luxury car"
                width={800}
                height={500}
                className="w-full h-125 object-cover"
                loading="eager"
                priority
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white/70 backdrop-blur-3xl p-6 rounded-3xl shadow-2xl border border-white/40 max-w-xs hidden md:block group">
              <p className="text-slate-600 font-medium leading-relaxed italic text-sm">
                &ldquo;The most seamless rental experience I&lsquo;ve ever had.
                Truly lives up to the name LuxeDrive.&ldquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCffgdLFw7BNEzyPxv-I8ckFm-jSFBvzX5gS1M1mTPUgsMfQtclvXK2W7_kZ1_Py4FZEvHK5I595VPhQSJVj5riTj5nQwpUr76T85sXKiGqfRa4aOGhj9QskCjD2RSSLdyRkhya_dFAu74Ue1O2kHZW5aAkDi62j5LsyE3AOMoHCCOUICX2mfKFBbYzNZ8mFf70J2nFiZv_4fZVMxhtq4aQNHRxCQ9Q6RUdVER8ow2qOle1z02f1fHslPHOpbdgtDnLq9Ss4HHohG8"
                    alt="CEO profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    loading="eager"
                    priority
                  />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tight">
                    Marcus Thorne
                  </p>
                  <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">
                    Privé Member
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Bento Grid */}
      <section className="container-custom py-20 bg-white/30 backdrop-blur-sm border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tight">
              Our Core Philosophy
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto font-medium">
              Guided by excellence, driven by passion. These are the values that
              fuel our commitment to your journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Item 1 */}
            <div className="md:col-span-2 bg-white/50 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative border border-white/40 shadow-xl shadow-rose-500/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
              <div>
                <Diamond className="text-primary mb-6 w-10 h-10" />
                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                  Uncompromising Standards
                </h3>
                <p className="text-slate-500 text-sm max-w-md font-medium leading-relaxed">
                  Every vehicle in our fleet undergoes a rigorous 120-point
                  inspection. We don't just meet industry standards; we define
                  them.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest group/link cursor-pointer">
                <span>Learn our process</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </div>
            </div>
            {/* Bento Item 2 */}
            <div className="bg-primary text-white rounded-[2rem] p-10 flex flex-col justify-center text-center shadow-lg shadow-rose-500/20 hover:-translate-y-2 transition-transform duration-500">
              <Gauge className="w-12 h-12 mb-6 mx-auto" />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">
                Effortless Speed
              </h3>
              <p className="text-white/80 font-medium text-sm">
                From booking to ignition in under 60 seconds. Our digital-first
                approach removes every barrier between you and the open road.
              </p>
            </div>
            {/* Bento Item 3 */}
            <div className="bg-white/50 backdrop-blur-2xl rounded-[2rem] p-10 flex flex-col justify-center border border-white/40 shadow-xl shadow-rose-500/5 hover:-translate-y-2 transition-transform duration-500">
              <Leaf className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                Sustainable Luxury
              </h3>
              <p className="text-slate-500 font-medium text-sm">
                Leading the transition to green mobility with the world's
                largest collection of luxury electric performance vehicles.
              </p>
            </div>
            {/* Bento Item 4 */}
            <div className="md:col-span-2 rounded-[2rem] overflow-hidden relative h-75 group shadow-xl">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn8m0c8l1eQtehqnCLOheW0lwC8BFjdnNJ0fYjomDAVsSZ29BH8nDSCn0WfpIZlCUXrc9xZJZ5Or4H5XpJkcmfr_Fz8SK9gWAuI9OyRwUkf8zUIop5eept09Ydfh75u6oKddOnHqeDWvcLUuthLIiVZtFxBLNh2PJ18PdEsxWXYhBt0zROk6qaPf4ZmNDPfCxX6JQuUgM47qikOyWY_VxzPkBUangzfw4nWErfEx5AISl5PwXUHgcXBLjyTgtS6Q9ed72edHXzQwQ"
                alt="Luxury interior"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent flex items-end p-10">
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                  Attention to every detail.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Story Section */}
      <section className="container-custom py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12 relative h-[64]">
              <div className="relative w-full h-64">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcuu8F5Fva5_ozSK-wDevoki1B-w1-QTrtfbH8sTzhTiHsaFfJTo3_SqjCY9Me9t5JcxP8cJtfMu6jHsCJYFlp0bLt2nlaV99R-IE_jZtg0ncFWEr1hiQzCZzXrlNZW1cTvmhXrZYg-mON5qEGeWtuFbCgU1ahY8kd6otXML9krGdmui_yFD1WyHmnveA24mVU9ABRGfons9lHSj98CskFi1N-dyv781ndjhaXM9Afu0Ogv8F5RmXbt1j1TRERrvzW2vFWARLcENA"
                  alt="Service detail"
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="relative w-full h-80">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDprRx9sbyvHqkZjlLZa8kpjsbUUW7otv8deuyYg-AXiea8P7M6WEs-HaoQ5bXjf8BWdKSaOEPVleYfNT5qVlU35lE9mDgCHTFfM2hxXI1VieasW8qWP6C33J7cb2Pqp56JszrR-8l3Wnbg8cluWH8B-Apev4Abyg5dCX7FQWkAWKWdRwUUKw13dU6zg32wr7wLSIxwg_8_s7LpOXAHfO4xs9dBEW5eSPz3IdI7ZO3jaAzRszYU3k5clukl-5IXUTSysjZLBmPsE0M"
                  alt="Engine detail"
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
            <div className="space-y-4 relative">
              <div className="relative w-full h-80">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT5BkFFd0SsgYYF1FIlBrOFAB3XYJqwKIPjkCL9NtV6mG7BEGQseVmQsbLedjxdqyhg1UBEChRwBXoZF2YrlqrKv47o9QUinUZtKf7Cg3hoMdIi49RLINFEweA9Cu4qWysZ0fPl1emqcAfXARIxmKSQzeEVXqGQyspglIIQVae9YkR6FfIOhPySn_a7EcsBikiUmzT16EtqOGHum3RLS2CvBZ9izQKxiLGgiHpXEyKYd0n6_5FoMEBQrHc3nKuAHdfzI2DSRG7LQM"
                  alt="Happy customer"
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="relative w-full h-64">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHX4JQvYd7oKZFbHlmADEGre54VzPpAUjmPXRnbeVAuZi96HtmkvmtY9BWdB556Eo_rYEHh3GuY-G3QOB-MS39a_f8YkwyNkNEXtl_FATBK-jgovrZA-w0PIv5ZOSgrsHsjbqZm1jLOBbxhHN3sdaQqjL0xRtIaAHLqFV5gpbOoHeEOojs5XisG8BIA4HJrcL2GKnurK_00_t-zLTWnRe_FfHjfgrpoquRq74kJBcWeMEHCok5EveLOvEwoPmrYI1ZkDVi52GfaRE"
                  alt="Car front"
                  fill
                  className="object-cover rounded-3xl shadow-lg"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight leading-none">
              The Story of <span className="text-primary">LuxeDrive</span>
            </h2>
            <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
              <p>
                It began in a small boutique garage in Zurich with three vintage
                Italian sports cars and a simple premise: renting a car should
                feel as rewarding as owning one.
              </p>
              <p>
                Over the past decade, we've expanded across four continents, but
                our core mission remains unchanged. We serve the explorers, the
                dreamers, and the achievers who understand that the journey is
                just as important as the destination.
              </p>
              <p>
                Today, LuxeDrive stands as the global leader in prestige vehicle
                rentals, offering an unparalleled fleet that ranges from
                timeless classics to the pioneers of electric performance.
              </p>
            </div>
            <div className="mt-10 p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-rose-100 shadow-xl shadow-rose-500/5">
              <p className="text-primary font-black text-sm uppercase tracking-widest mb-2">
                Our Promise
              </p>
              <p className="text-slate-700 font-bold leading-relaxed italic text-base">
                "To provide the most sophisticated, seamless, and personalized
                transportation service in the world, without compromise."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-12 ">
        <div className="group bg-white/40 backdrop-blur-3xl rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-white/60 shadow-2xl shadow-rose-500/5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ms-20 -mb-20 group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(185,5,56,0.05)_0%,transparent_70%)]" />

          <h2 className="text-3xl font-black text-slate-900 mb-6 relative z-10 uppercase tracking-wide leading-none">
            Ready for your next masterpiece?
          </h2>
          <p className="text-base text-slate-500 mb-10 max-w-md mx-auto relative z-10 font-medium">
            Join over 10,000 members who choose LuxeDrive for their most
            important journeys.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link
              href="/browse"
              className="bg-primary text-white px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:shadow-rose-500/40 transition-all active:scale-95 text-center"
            >
              Explore the Fleet
            </Link>
            <Button
              variant="outline"
              className="border-2 border-primary px-10 py-6 rounded-full text-primary text-[10px] uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all"
            >
              Speak to a Concierge
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};
export default AboutPage;
