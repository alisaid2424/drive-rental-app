import Image from "next/image";
import FormSearchCarRental from "./_components/FormSearchCarRental";

const Hero = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7R9MBodefnW4jTFUc33zacidOm8pneAyQ4ExdSYFh7I4ieD8ABAe_IQziF6DFKkROYhdLQljc0iH4OQU60VHvqaOGqpkyDyGRcZeaSROOzBGR_Wk-oRvmrCzlQl8KzQKjnugmv5lTASNhZtqB_rBQA4m3SHjtkP6keGNCCWZreiWdnxj3Mw0YXclnVzwunbm7J_Wt_zrevY7QxoCX6pzOLRe7RrGkt-YNNxusvXG-EXukA2lJGk_o9tKvod6svR_HKw_dqeTP-vU"
          alt="Luxury sports car driving along a coastal highway at sunset"
          fill
          priority
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-8 pt-10 text-center">
        <span className="mb-4 rounded-full bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md md:text-sm">
          Experience the Extraordinary
        </span>

        <h1 className="max-w-4xl text-4xl font-light leading-10 md:leading-20 tracking-tight text-white drop-shadow-2xl capitalize md:text-7xl">
          Elevate Your <br />
          Journey With <br />
          <span className="italic font-light text-primary">Elegance</span>
        </h1>

        {/* Search Card */}
        <FormSearchCarRental />
      </div>
    </section>
  );
};

export default Hero;
