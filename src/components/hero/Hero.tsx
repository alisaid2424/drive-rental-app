import Image from "next/image";
import dynamic from "next/dynamic";

const FormSearchCarRental = dynamic(
  () => import("./_components/FormSearchCarRental"),
  {
    ssr: true,
    loading: () => (
      <div className="mt-5 h-50 w-full max-w-5xl animate-pulse rounded-[32px] bg-white/10 md:mt-12 md:h-30 md:rounded-[40px]" />
    ),
  },
);

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
        <div>
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md md:text-sm">
            Experience the Extraordinary
          </span>

          <h1 className="max-w-4xl text-4xl font-light leading-10 tracking-tight text-white drop-shadow-2xl capitalize md:text-7xl md:leading-20">
            Elevate Your <br />
            Journey With <br />
            <span className="italic font-light text-primary">Elegance</span>
          </h1>
        </div>

        <FormSearchCarRental />
      </div>
    </section>
  );
};

export default Hero;
