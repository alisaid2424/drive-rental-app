import LottieHandler from "@/components/LottieHandler";
import { BackButton } from "@/components/BackButton";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen element-center flex-col mx-auto px-6 max-w-md w-full text-center">
      <LottieHandler type="notFound" />

      <h2 className="text-foreground mb-4">Page Not Found</h2>

      <p className="text-muted-foreground mb-12 max-w-md">
        The road you&apos;re looking for doesn&apos;t exist or has been
        redirected. Let&apos;s get you back on the right track.
      </p>

      <BackButton title="Return Home" href="/" variant="default" />
    </div>
  );
};

export default NotFoundPage;
