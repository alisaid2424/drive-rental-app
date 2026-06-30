import * as motion from "motion/react-client";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 element-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center">
        {/* Spinner Container */}
        <div className="relative h-24 w-24 element-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />

          {/* Inner Pulse */}
          <div className="h-12 w-12 rounded-full bg-primary/20 animate-ping" />

          {/* Center Dot */}
          <div className="absolute h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_rgba(185,5,56,0.6)]" />
        </div>

        {/* Loading Text */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="text-[13px] font-label-sm text-primary tracking-[0.2em] animate-pulse uppercase">
            Loading Experience
          </span>
          <div className="h-0.5 w-32 bg-primary/10 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute h-full bg-primary w-1/2"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
