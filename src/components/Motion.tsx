import * as motion from "motion/react-client";
import { ReactNode } from "react";

type MotionProps = {
  children: ReactNode;
  index?: number;
  className?: string;
  as?: "div" | "tr";
};

const Motion = ({ children, className, index, as = "div" }: MotionProps) => {
  const Component = as === "tr" ? motion.tr : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{
        duration: 0.6,
        delay: index ? index * 0.3 : 0,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default Motion;
