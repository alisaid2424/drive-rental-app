import Image from "next/image";
import Motion from "../Motion";
import FormSearchCarRental from "./_components/FormSearchCarRental";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Luxury sports car background"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-8 pt-10 text-center">
        <Motion fade={false}>
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md md:text-sm">
            Experience the Extraordinary
          </span>

          <h1 className="max-w-4xl text-4xl font-light leading-10 tracking-tight text-white drop-shadow-2xl capitalize md:text-7xl md:leading-20">
            Elevate Your <br />
            Journey With <br />
            <span className="italic font-light text-primary">Elegance</span>
          </h1>
        </Motion>

        <FormSearchCarRental />
      </div>
    </section>
  );
};

export default Hero;
