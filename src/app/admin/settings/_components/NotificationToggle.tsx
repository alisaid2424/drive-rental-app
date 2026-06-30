import { Switch } from "@/components/ui/switch";

interface NotificationToggleProps {
  title: string;
  description: string;
  defaultChecked?: boolean;
}

const NotificationToggle = ({
  title,
  description,
  defaultChecked,
}: NotificationToggleProps) => {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <div className="space-y-0.5">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
};

export default NotificationToggle;
