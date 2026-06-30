import { Lock, MonitorSmartphone, Shield, Smartphone } from "lucide-react";
import SecurityCard from "./SecurityCard";
import { Button } from "@/components/ui/button";

const SecuritySection = () => {
  return (
    <section className="col-span-12 settings-card space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-xl">
          <Shield size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight">
            Security & Encryption
          </h3>
          <p className="text-sm text-muted-foreground">
            Protect your administrative access
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SecurityCard
          icon={<Lock size={22} />}
          title="Change Password"
          description="Update your credentials to maintain peak security."
          action={
            <Button
              variant="link"
              className="p-0 h-auto text-primary font-semibold text-xs uppercase tracking-wider"
            >
              Update Now
            </Button>
          }
        />

        <SecurityCard
          icon={<Smartphone size={22} />}
          title="Multi-Factor Auth"
          description="Add an extra layer of biometric or SMS security."
          action={
            <Button
              size="sm"
              className="w-full sm:w-auto rounded-xl text-xs uppercase tracking-wider px-4"
            >
              Enable 2FA
            </Button>
          }
        />

        <SecurityCard
          icon={<MonitorSmartphone size={22} />}
          title="Active Sessions"
          description="Monitor and manage all devices currently logged in."
          action={
            <Button
              variant="link"
              className="p-0 h-auto text-muted-foreground hover:text-primary font-semibold text-xs uppercase tracking-wider"
            >
              Review Sessions
            </Button>
          }
        />
      </div>
    </section>
  );
};

export default SecuritySection;
