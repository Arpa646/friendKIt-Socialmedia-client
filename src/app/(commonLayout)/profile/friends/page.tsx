"use client";

import React from "react";
import { useGetAllUserQuery, useUnfollowRequestMutation } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import Image from "next/image";
import { UserProfile } from "../types"; // Import the updated UserProfile type

const Friend = () => {
  const { userId } = useUser(); // Assuming `useUser` provides the current user's ID.
  const { data: users, error, isLoading } = useGetAllUserQuery(undefined);
  const [unfollowRequest] = useUnfollowRequestMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data.</div>;

  // Filter users where the current user's ID is in their followers list
  const followers = users?.data?.filter((user: UserProfile) =>
    user.followers.some((follower) => follower._id === userId) // Explicitly check for ObjectId match
  );

  const handleUnfollow = (targetUserId: string) => {
    unfollowRequest({ currentUserId: userId, targetUserId })
      .then((response) => {
        console.log("Unfollow request successful", response);
      })
      .catch((error) => {
        console.error("Error unfollowing user", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Connections</h1>
      <div className="flex flex-col gap-4">
        {followers?.map((user: UserProfile) => (
          <div key={user._id} className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md">
            <Image
              src={user.image || "https://themes.stackbros.in/social_r/assets/01-DSmaVzM7.jpg"}
              alt={user.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-medium text-white">{user.name}</h2>
              <p className="text-sm text-gray-400">{user.role || 'User Role'}</p>
              <p className="text-xs text-gray-500">Connections: 20+ shared connections</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleUnfollow(user._id)} // Trigger handleUnfollow on click
                className="bg-red-600 text-white text-sm px-3 py-1 rounded-md"
              >
                Remove
              </button>
              <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md">Message</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friend;
