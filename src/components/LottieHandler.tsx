"use client";

import dynamic from "next/dynamic";
import notFound from "../assets/animation/notFound.json";
import empty from "../assets/animation/empty.json";
import error from "../assets/animation/error.json";

const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto w-full max-w-[288px] aspect-square rounded-full bg-muted/40 animate-pulse" />
    ),
  },
);

const lottieFilesmap = {
  notFound,
  empty,
  error,
};

interface LottieHandlerProps {
  type: keyof typeof lottieFilesmap;
  message?: string;
}

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFilesmap[type];
  return (
    <div className="mx-auto w-full max-w-xs text-center">
      <Lottie animationData={lottie} />
      {message && (
        <h3
          className={`mt-5 text-lg font-medium 
        ${type === "error" ? "text-destructive" : "text-muted-foreground"} 
        wrap-break-word whitespace-pre-wrap `}
          style={{ wordBreak: "break-word" }}
        >
          {message}
        </h3>
      )}
    </div>
  );
};

export default LottieHandler;
