import { Bell } from "lucide-react";
import NotificationToggle from "./NotificationToggle";

const NotificationSection = () => {
  return (
    <section className="col-span-12 lg:col-span-4 settings-card sm:p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <Bell size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold tracking-tight">Notifications</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            Push & Email alerts
          </p>
        </div>
      </div>

      <div className="divide-y divide-border pt-2">
        <NotificationToggle
          title="Email Alerts"
          description="Instant confirmations"
          defaultChecked
        />
        <NotificationToggle
          title="SMS Notifications"
          description="Urgent maintenance"
          defaultChecked
        />
        <NotificationToggle
          title="Marketing Updates"
          description="News and promotions"
        />
      </div>
    </section>
  );
};

export default NotificationSection;
