type Props = {
  title: string;
  subtitle: string;
  align?: string;
};

export function Heading({ title, subtitle, align }: Props) {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${
        align === "left" && "md:items-start md:text-start"
      }`}
    >
      <h2 className="text-2xl font-black tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="text-sm font-medium text-gray-500/90 mt-2 max-w-md">
        {subtitle}
      </p>
    </div>
  );
}
