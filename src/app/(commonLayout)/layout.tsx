import type { Metadata } from "next";
import NavBar from "./components/page/shared/Navnar";

export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-primary">
      <NavBar />
      <div className="mx-auto w-full lg:container">
        {children}
      </div>
      {/* <Footer></Footer> */}
    </div>
  );
}
