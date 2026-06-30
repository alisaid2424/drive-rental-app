import { Heading } from "@/components/Heading";
import ProfileForm from "./_components/ProfileForm";
import NotificationSection from "./_components/NotificationSection";
import SecuritySection from "./_components/SecuritySection";
import DangerZoneSection from "./_components/DangerZoneSection";
import ButtonActions from "./_components/ButtonActions";

const SettingsPage = () => {
  return (
    <div className="space-y-8 pb-14 pt-5 lg:pt-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <Heading
          title="Account Settings"
          subtitle="Manage your luxury fleet profile, security preferences, and administrative configurations."
          align="left"
        />

        <ButtonActions />
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Profile Information Section */}
        <ProfileForm />

        {/* Notifications Section */}
        <NotificationSection />

        {/* Security Section */}
        <SecuritySection />

        {/* Danger Zone Section */}
        <DangerZoneSection />
      </div>
    </div>
  );
};

export default SettingsPage;
