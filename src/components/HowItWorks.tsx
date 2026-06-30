import { Car, CalendarDays, KeyRound } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Pick Your Ride",
    description:
      "Choose from our curated collection of luxury sedans, exotic sports cars, and premium SUVs.",
  },
  {
    icon: CalendarDays,
    title: "Set Dates & Location",
    description:
      "Select your pickup time and location. We can even deliver the car directly to your doorstep.",
  },
  {
    icon: KeyRound,
    title: "Drive with Elegance",
    description:
      "Complete your booking and enjoy your premium travel experience with full insurance coverage.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container-custom">
        <div className="text-center mb-24">
          <span className="text-primary font-black uppercase tracking-widest">
            Process
          </span>

          <h2 className="text-slate-900 mt-6">Rent in 3 Simple Steps</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center process-card group cursor-pointer"
            >
              <div className="process-icon-container shadow-[0_20px_40px_rgba(0,0,0,0.05)]">
                <Icon
                  size={48}
                  className="text-primary group-hover:text-white transition-colors duration-300"
                />
              </div>

              <h3 className="mb-6 text-slate-900 group-hover:text-primary transition-colors duration-500">
                {title}
              </h3>

              <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
