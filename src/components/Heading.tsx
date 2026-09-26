import * as motion from "motion/react-client";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  align?: string;
  classNameTitle?: string;
  classNameSubTitle?: string;
  className?: string;
};

const titleCharVariants = {
  hidden: {
    rotateX: -90,
    opacity: 0,
  },
  show: {
    rotateX: [0, -90, 0, 0, -90, 0],
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const subtitleCharVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function Heading({
  title,
  subtitle,
  align,
  classNameTitle,
  classNameSubTitle,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center text-center",
        align === "left" && "md:items-start md:text-start",
        className,
      )}
    >
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          show: {
            transition: {
              staggerChildren: 0.03,
            },
          },
        }}
        style={{ perspective: 1000 }}
        className={cn(
          "flex flex-wrap gap-x-[0.25em] justify-center text-2xl font-black tracking-tight text-slate-900",
          align === "left" && "md:justify-start",
          classNameTitle,
        )}
      >
        {title.split(" ").map((word, wordIdx) => (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIdx) => (
              <motion.span
                key={charIdx}
                variants={titleCharVariants}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.02 },
            },
          }}
          className={cn(
            "flex flex-wrap gap-x-[0.25em] justify-center text-sm font-medium text-gray-500/90 mt-2 max-w-md",
            align === "left" && "md:justify-start",
            classNameSubTitle,
          )}
        >
          {subtitle.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  variants={subtitleCharVariants}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.p>
      )}
    </div>
  );
}
