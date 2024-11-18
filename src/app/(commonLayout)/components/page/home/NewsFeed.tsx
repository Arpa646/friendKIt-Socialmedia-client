import React from "react";
import LeftSidebar from "./LeftSidebar";
import MiddleFeed from "./MiddleFeed";
import RightSidebar from "./RightSidebar";

const NewsFeed = () => (
  <div className="flex h-screen">
    {/* Left Sidebar */}
    <div className="w-1/4 hidden lg:block">
      <LeftSidebar />
    </div>

    {/* Middle Feed */}
    <div className="w-full lg:w-3/4 xl:w-1/2">
      <MiddleFeed />
    </div>

    {/* Right Sidebar */}
    <div className="w-1/4 hidden xl:block">
      <RightSidebar />
    </div>
  </div>
);

export default NewsFeed;
