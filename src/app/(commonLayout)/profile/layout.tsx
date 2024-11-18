import type { Metadata } from "next";

import ProfileHeader from "./ProfileHeader";
import RightSidebar from "./RightSidebar";

export const metadata: Metadata = {
  title: "Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-primary h-screen mt-6 mx-auto w-11/12 md:w-10/12">
      <div className="flex flex-col lg:flex-row justify-center gap-8">
        {/* Main Content */}
        <div className="w-full lg:w-8/12">
          <div>
            <ProfileHeader />
          </div>
          <div>{children}</div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-4/12 hidden lg:block">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
