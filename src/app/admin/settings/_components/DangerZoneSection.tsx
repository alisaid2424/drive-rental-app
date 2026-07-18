import { AlertTriangle } from "lucide-react";
import DangerZoneButton from "./DangerZoneButton";

const DangerZoneSection = () => {
  return (
    <section className="col-span-12 border border-destructive/30 rounded-3xl p-6 sm:p-10 bg-destructive/5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-destructive/10 text-destructive rounded-xl shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-destructive tracking-tight">
              Danger Zone
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Permanently deactivate your fleet manager account and erase all
              associated luxury assets and booking history. This action is
              irreversible.
            </p>
          </div>
        </div>

        <DangerZoneButton />
      </div>
    </section>
  );
};

export default DangerZoneSection;
