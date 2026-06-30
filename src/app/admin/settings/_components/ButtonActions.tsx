import { Button } from "@/components/ui/button";

const ButtonActions = () => {
  return (
    <div className="flex gap-4 w-full md:max-w-xs shrink-0">
      <Button
        type="reset"
        form="profile-form"
        variant="outline"
        className="flex-1 text-primary! border-primary hover:bg-white"
      >
        Discard
      </Button>

      <Button type="submit" form="profile-form" className="flex-1">
        Save Changes
      </Button>
    </div>
  );
};

export default ButtonActions;
