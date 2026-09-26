import { Car, CalendarDays, KeyRound } from "lucide-react";
import Motion from "./Motion";
import { Heading } from "./Heading";

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
        <Heading
          title="Process"
          subtitle="Rent in 3 Simple Steps"
          className="mb-24"
          classNameTitle="text-xl text-primary font-black uppercase tracking-widest"
          classNameSubTitle="text-slate-900 mt-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {steps.map(({ icon: Icon, title, description }, idx) => (
            <Motion
              key={title}
              index={idx}
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
            </Motion>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
