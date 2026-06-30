interface SecurityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
}

const SecurityCard = ({
  icon,
  title,
  description,
  action,
}: SecurityCardProps) => {
  return (
    <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col justify-between items-start space-y-4 hover:bg-rose-100 hover:border-rose-200 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="space-y-3">
        <div className="text-primary">{icon}</div>
        <h4 className="font-bold text-base text-slate-900 dark:text-slate-50">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-full pt-2">{action}</div>
    </div>
  );
};

export default SecurityCard;
