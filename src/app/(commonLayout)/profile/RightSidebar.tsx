"use client";

import React from "react";

// import { useUser } from "@/services";
import UploadStory from "./UploadStory"
import Gallery from "./Gallery"



const RightSidebar = () => {
  // Fetch user data

  // const { userId: currentUserId } = useUser(); // Assuming this gives the current user ID

  // Set up follow and unfollow mutations
  // const [followRequest] = useFollowRequestMutation();
  // const [unfollowRequest] = useUnfollowRequestMutation();

  // if (isLoading) return <p>Loading...</p>;
  // if (Error) return <p>Error loading user data</p>;

  // // Handlers for follow and unfollow actions
  // const handleFollow = (targetUserId) => {
  //   followRequest({ currentUserId, targetUserId })
  //     .then((response) => {
  //       console.log("Follow request successful", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error following user", error);
  //     });
  // };

  // const handleUnfollow = (targetUserId) => {
  //   unfollowRequest({ currentUserId, targetUserId })
  //     .then((response) => {
  //       console.log("Unfollow request successful", response);
  //     })
  //     .catch((error) => {
  //       console.error("Error unfollowing user", error);
  //     });
  // };

  return (
    <div className="space-y-5">
      <div className=" p-4  bg-background border border-[#202227] rounded text-white space-y-3">
        {/* Who to follow section */}
        <h1 className="font-bold">About</h1>
        <p className="text-gray">
          He moonlights difficult engrossed it, sportsmen. Interested has all
          Devonshire difficulty gay assistance joy.
        </p>
        <p className="text-gray">
        
          Born: <span className="font-bold ">October 20, 1990</span>
        </p>
        <p className="text-gray">
     
          Status: <span className="font-bold text-gray">Single</span>
        </p>
        <p className="text-gray">
       
          Email: <span className="font-bold text-gray">abc@xyz.com</span>
        </p>
      </div>

      <div className="border p-2 bg-background   border-[#202227] rounded">
        <UploadStory />
     
      </div>
      <div className="border p-2 bg-background   border-[#202227] rounded">
      <Gallery/>
      </div>
    </div>
  );
};

export default RightSidebar;
