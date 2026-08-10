import Footer from "@/components/Footer";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="flex-1 min-h-[calc(100vh-80px)]">{children}</main>
      <Footer />
    </div>
  );
}
