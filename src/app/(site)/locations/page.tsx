import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, PlaneTakeoff, Star, Sun } from "lucide-react";
import Image from "next/image";
import { locations } from "./_components/data";

const LocationsPage = () => {
  return (
    <section className="pt-28 container-custom">
      <article>
        <div className="relative h-100 flex items-center justify-center overflow-hidden rounded-[2.5rem] shadow-2xl shadow-rose-500/5">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_DxRzs54X3zvrkHN_AxRrWYtrWmiFxzpMf73mUOdE5oSN9P_mJfjKFJRIXj3mQD1etFYbR0MjDiNLJWma_snkBnGr1M2g6Byu6oXtbI72_VXgcjuMQvmK3IohUSqkHfij0HMemejwkTu0urJAwL9K2ZlsXXPD0MGqfbbVNGVibDgm0g-dSCFFV03d_pTA4LZkAQbJFJH-Fh0PMZ-U8IEvAjNdNj4RrD_m8izWcWxXNMzRT-wgwTnG2qk5z1ROJ3ux0wtQLk0_T8o"
            alt="Modern luxury car showroom"
            fill
            loading="eager"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 z-15" />
          <div className="relative z-20 text-center px-6">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase leading-none">
              Our Global Network
            </h2>
            <p className="text-white/90 text-base max-w-xl mx-auto font-medium">
              Luxury at your doorstep. Discover our premium pickup points across
              the world&apos;s most prestigious destinations.
            </p>
          </div>
        </div>
      </article>

      <article className="py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar / Filter */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white/70 backdrop-blur-2xl p-8 rounded-[2rem] border border-white/40 shadow-xl shadow-rose-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
              <h3 className="text-xl font-black mb-6 text-[#271718] uppercase tracking-tight relative z-10">
                Find Nearby
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="text-[10px] font-black block mb-2 text-slate-400 uppercase tracking-widest px-1">
                    Country
                  </label>
                  <select className="w-full bg-[#fffcfc] border border-slate-100 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary outline-none text-sm font-bold shadow-sm appearance-none">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>United Arab Emirates</option>
                    <option>France</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black block mb-2 text-slate-400 uppercase tracking-widest px-1">
                    City
                  </label>
                  <select className="w-full bg-[#fffcfc] border border-slate-100 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-primary outline-none text-sm font-bold shadow-sm appearance-none">
                    <option>Los Angeles</option>
                    <option>New York</option>
                    <option>Miami</option>
                    <option>Las Vegas</option>
                  </select>
                </div>
                <Button className="w-full mt-4 py-5.5">Apply Filters</Button>
              </div>
            </div>

            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white/40 group cursor-pointer">
              <div className="relative w-full h-75 overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAflN62b7hl1Meqroyi9U2BZgz05ddRncti7X7kCF8flqbKz8TkOX0YnF2dE_e6MT2HF74YPZqoUQTPTUWCqM478VRzTXycI6CwjlQ8P6rQDz5vZSFLS3MogrHcbp-Jzz6hNgP9INpSUO8-cy1GyCyagQIGeHaK7qOgSyYz-uZ7MXu5llo_2TgeItyTKMPXKfN2sas3MTuO8runRQ0BLz2P3ku9Vuijfr643hfw8t_XjxIo-fSo1p4VLmnGpvUXv0AxmQD2ZekAK2U"
                  alt="Digital map visualization"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              </div>
            </div>
          </aside>

          {/* Location Grid */}
          <div className="lg:col-span-8 space-y-12">
            {locations.map((location) => (
              <div
                key={location.id}
                className="bg-white/70 backdrop-blur-2xl p-2 rounded-[2.5rem] flex flex-col md:flex-row gap-8 hover:-translate-y-1.5 transition-all duration-500 shadow-xl shadow-rose-500/5 border border-white/40 overflow-hidden group"
              >
                <div className="md:w-2/5 h-64 md:h-auto overflow-hidden rounded-[2.2rem] relative">
                  <Image
                    src={location.image}
                    alt={location.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    loading="eager"
                    priority
                  />
                </div>

                <div className="md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <h2 className="text-xl font-black text-primary uppercase tracking-tight">
                        {location.title}
                      </h2>

                      <span
                        className={`${location.badgeClass} font-black px-2 py-1.5 rounded-lg text-[8px] uppercase tracking-widest shadow-sm`}
                      >
                        {location.badge}
                      </span>
                    </div>

                    <div className="space-y-4 text-slate-500 text-sm font-medium">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-primary mr-4 mt-0.5 shrink-0" />
                        <p>{location.address}</p>
                      </div>

                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-primary mr-4 shrink-0" />
                        <p>{location.phone}</p>
                      </div>

                      {location.email && (
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 text-primary mr-4 shrink-0" />
                          <p>{location.email}</p>
                        </div>
                      )}

                      {location.airportTransfer && (
                        <div className="flex items-center">
                          <PlaneTakeoff className="w-5 h-5 text-primary mr-4 shrink-0" />
                          <p>{location.airportTransfer}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-10 flex gap-4">
                    <Button variant="outline" className="flex-1 text-primary!">
                      View Map
                    </Button>
                    <Button className="flex-1">Book Selection</Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Bento Variation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/70 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/40 hover:-translate-y-1.5 transition-all shadow-xl shadow-rose-500/5 group">
                <h3 className="text-xl font-black text-primary mb-3 uppercase tracking-tight">
                  Santa Monica Pier
                </h3>
                <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">
                  Oceanfront delivery and pickup service available exclusively
                  for Platinum members.
                </p>
                <div className="flex items-center text-primary font-black mb-10 text-[10px] uppercase tracking-widest">
                  <Star className="w-6 h-6 mr-3  group-hover:rotate-12 transition-transform" />
                  VIP PRIVILEGE
                </div>
                <Button className="w-full py-5.5  bg-rose-50 text-primary hover:bg-rose-100 transition-all">
                  Explore Services
                </Button>
              </div>
              <div className="bg-primary p-10 rounded-[2.5rem] border border-primary hover:-translate-y-1.5 transition-all shadow-2xl shadow-rose-500/20 text-white group">
                <h3 className="text-xl font-black mb-3 uppercase tracking-tight">
                  Malibu Retreat
                </h3>
                <p className="mb-8 text-sm font-medium opacity-90 leading-relaxed">
                  Seasonal location open from May to September. Experience
                  coastal luxury like never before.
                </p>
                <div className="flex items-center font-black mb-10 text-[10px] uppercase tracking-widest text-rose-100">
                  <Sun className="w-6 h-6 mr-3 text-white animate-pulse" />
                  SEASONAL HUB
                </div>
                <Button className="w-full py-5.5 bg-white text-primary hover:bg-rose-50 transition-all">
                  Join Waitlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      <article className="bg-white/70 backdrop-blur-3xl py-20 px-5 rounded-[4rem] mb-20 text-center relative overflow-hidden border border-white/60 shadow-2xl shadow-rose-500/5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-500/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />

        <div className="relative z-10">
          <h2 className="text-4xl font-black text-primary mb-5 uppercase tracking-tighter">
            Request a Delivery
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12 font-medium text-base leading-relaxed">
            Can&apos;t make it to one of our locations? We&apos;ll bring the
            luxury to you. Our door-to-door service is available in 50+ major
            cities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <input
              className="w-full sm:max-w-sm px-8 py-4 rounded-2xl! border-2 border-rose-300 bg-white focus:ring-2 focus:ring-primary focus:border-0 caret-primary shadow-inner outline-none text-sm font-bold placeholder:text-slate-300"
              placeholder="Enter your email for a custom quote"
              type="email"
              autoComplete="off"
            />
            <Button className="max-sm:w-full px-12 py-7.5 rounded-2xl! uppercase hover:shadow-2xl transition-all shadow-xl shadow-rose-500/30">
              Send Request
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
};
export default LocationsPage;
