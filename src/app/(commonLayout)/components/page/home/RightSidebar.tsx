import React from "react";
import {
  useGetUserQuery,
  useFollowRequestMutation,
  useUnfollowRequestMutation,
} from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { User1 } from "./types";
import { SkeletonLoader } from "./SkeletonLoader"; 
const fallbackImage =
  "https://themes.stackbros.in/social_r/assets/07-DLMl_mTI.jpg";

const RightSidebar = () => {
  // Fetch user data
  const { data: users, error, isLoading } = useGetUserQuery(undefined);
  const { userId: currentUserId } = useUser(); // Assuming this gives the current user ID
  interface NewsItem {
    headline: string;
    time: string;
  }

  const newsData: NewsItem[] = [
    {
      headline: "Ten questions you should answer truthfully",
      time: "2hr",
    },
    {
      headline: "Five unbelievable facts about money",
      time: "3hr",
    },
    {
      headline: "Best Pinterest Boards for learning about business",
      time: "4hr",
    },
    {
      headline: "Skills that you can learn from business",
      time: "6hr",
    },
  ];
  // Set up follow and unfollow mutations
  const [followRequest] = useFollowRequestMutation();
  const [unfollowRequest] = useUnfollowRequestMutation();

  if (isLoading) return <div>    <SkeletonLoader/></div>;
  if (error) return <p>Error loading user data</p>;

  // Filter out the current user
  const filteredUsers = users?.data.filter(
    (user: User1) => user._id !== currentUserId
  );

  // Handlers for follow and unfollow actions
  const handleFollow = (targetUserId: string) => {
    followRequest({ currentUserId, targetUserId })
      .then((response) => {
        console.log("Follow request successful", response);
      })
      .catch((error) => {
        console.error("Error following user", error);
      });
  };

  const handleUnfollow = (targetUserId: string) => {
    unfollowRequest({ currentUserId, targetUserId })
      .then((response) => {
        console.log("Unfollow request successful", response);
      })
      .catch((error) => {
        console.error("Error unfollowing user", error);
      });
  };

  return (
    <div className="  rightsidebar   p-4 mt-3  bg-background border border-[#202227] rounded-lg text-white">
      {/* Who to follow section */}
      <div className="suggestions mb-8">
        <h4 className="font-bold mb-4">Who to follow</h4>
        {filteredUsers?.map((user: User1, index: number) => {
          const isFollowing = user.followers.includes(currentUserId);

          return (
            <div
              key={index}
              className="flex items-center px-4 justify-between mb-4"
            >
              <div className="flex items-center">
                <img
                  src={user.image || fallbackImage}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="ml-4">
                  <h5 className="font-bold">{user.name}</h5>
                  <p className="text-sm text-gray-400">{user.location}</p>
                </div>
              </div>
              <div
                onClick={() =>
                  isFollowing
                    ? handleUnfollow(user._id)
                    : handleFollow(user._id)
                }
                className={`cursor-pointer text-[#0f6fec] hover:text-white font-bold flex items-center justify-center w-8 h-8 rounded-full 
                  bg-[#0f6fec27] hover:bg-[#0f6fec] ${
                    isFollowing
                      ? "bg-gray-500 text-[#0f6fec]"
                      : "text-[#0f6fec] hover:text-white"
                  }`}
              >
                {isFollowing ? <FontAwesomeIcon icon={faUserGroup} /> : "+"}
              </div>
            </div>
          );
        })}
        <button className="mt-4 bg-blue-600 p-2 rounded w-full">
          View more
        </button>
      </div>

      {/* News section */}
      <div className="news">
        <div className="news bg-background p-4 mt-4 border border-[#202227] rounded-lg text-white">
          <h4 className="font-bold text-lg mb-4">Today's News</h4>
          {newsData.map((item, index) => (
            <div key={index} className="news-item mb-4">
              <h5 className="text-blue-400 font-semibold">{item.headline}</h5>
              <p className="text-sm text-gray-400">{item.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
