import {
  MapPin,
  Verified,
  Shield,
  Star,
  Phone,
  Mail,
  Share2,
  Camera,
  Award,
} from "lucide-react";
import ContactForm from "./_components/ContactForm";
import Link from "next/link";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="container-custom pt-32 pb-20">
      {/* Heading */}
      <div className="mb-12 md:text-center max-w-3xl md:mx-auto">
        <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight leading-none">
          How can we help?
        </h2>
        <p className="text-sm max-w-xl md:mx-auto text-slate-500 font-medium leading-relaxed italic">
          Experience premium service before you even get behind the wheel. Our
          concierge team is available 24/7 to assist with your luxury travel
          needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/40 shadow-2xl shadow-rose-500/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16" />
            <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight relative z-10">
              Our Offices
            </h3>
            <div className="space-y-8 relative z-10">
              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm">
                  <MapPin className="text-primary group-hover:text-white w-6 h-6 " />
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary mb-1 uppercase tracking-[0.2em]">
                    Global Headquarters
                  </p>
                  <p className="text-lg font-black text-slate-900 mb-0.5">
                    Mayfair, London
                  </p>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                    15-17 Berkeley Square, London W1J 6HB
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm">
                  <Phone className="text-primary group-hover:text-white w-6 h-6 transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary mb-1 uppercase tracking-[0.2em]">
                    24/7 Concierge
                  </p>
                  <p className="text-lg font-black text-slate-900 mb-0.5">
                    +44 20 7946 0123
                  </p>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                    Available via WhatsApp & iMessage
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start group">
                <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-500 shadow-sm">
                  <Mail className="text-primary group-hover:text-white w-6 h-6 transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-primary mb-1 uppercase tracking-[0.2em]">
                    General Inquiries
                  </p>
                  <p className="text-lg font-black text-slate-900 mb-0.5">
                    hello@luxedrive.com
                  </p>
                  <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                    Typical response time: &lt; 2 hours
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100/60 relative z-10">
              <p className="text-[9px] font-black text-slate-400 mb-5 uppercase tracking-[0.2em]">
                Connect with us
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Share2, href: "#" },
                  { icon: Camera, href: "#" },
                  { icon: Award, href: "#" },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={index}
                      className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-500 shadow-sm active:scale-90"
                      href={item.href}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] overflow-hidden h-64 shadow-md border border-white/40 group cursor-crosshair">
            <Image
              className="w-full h-full scale-140 object-cover transition-transform duration-1000 group-hover:scale-150"
              alt="Map of Mayfair London"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZKQgPkT3x7VZ-2ycGCcynP8WbmDdXwp0N2xf8s79l6D6GZMPk6Y9aBgkuFSpyY_cH7cIJ91BtctxE97T44HsOYYnMVlBhSFa6H7u685wO1Qp9yG-jbfarEAa5n-Pmxq4V0mIw9VPjOzQ4nneALU9uXwNIfYzcXAmBNp8uSAUD9TOgKtXzcqHoqtMZ7IF1st7wHpVm5lEaAMxLzXs-nQrliX9p9GNoSHEookh_R6vJFvJGdeVMr-T2aw4NJoqG0NtD72nukEpILOc"
              width={400}
              height={400}
              priority
              loading="eager"
            />
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white/40 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/40 shadow-2xl shadow-rose-500/5">
            <div className="mb-10">
              <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">
                Send a Message
              </h2>
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                Fill out the form below and our regional director will reach out
                shortly.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { icon: Verified, label: "Global Coverage" },
              { icon: Shield, label: "Secured Privacy" },
              { icon: Star, label: "Five Star Service" },
            ].map((badge, i) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className={`text-center ${
                    i === 1 ? "border-x border-slate-100" : ""
                  }`}
                >
                  <Icon className="text-primary mb-2 w-6 h-6 mx-auto" />
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-tight">
                    {badge.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
