"use client";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useGetSingleUserQuery } from "@/GlobalRedux/api/api";

interface RootState {
  auth: {
    token: string;
  };
}

interface CustomJwtPayload {
  role?: string;
  userId?: string;
  useremail?: string;
}

const ProfileHeader = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const user: CustomJwtPayload | null = token
    ? jwtDecode<CustomJwtPayload>(token)
    : null;

  const userId = user?.useremail;
  const { data: profileItem } = useGetSingleUserQuery(userId);
  const profileData = profileItem?.data;

  return (
    <div className="bg-[#141519] border border-[#202227] rounded text-white">
      {/* Banner Image - Fallback if not available */}
      <div className="relative h-[300px] w-full">
        {profileData?.bannerImage ? (
          <Image
            src={profileData.bannerImage}
            alt="Banner Image"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        ) : (
          <div className="bg-gray-600   flex items-center justify-center h-full text-white text-lg font-semibold rounded-t-lg">
            <p className="border border-dashed border-[#252629] rounded-lg p-4 text-center">
              Add a cover photo
            </p>
          </div>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="relative px-6 flex items-center space-x-6">
        {/* Profile Picture */}
        <div className="w-40 h-40 rounded-full border-4 border-gray-900 overflow-hidden -mt-20">
          <Image
            src={profileData?.image}
            alt="Profile Picture"
            width={160}
            height={160}
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col space-y-1 pt-6">
          <h2 className="text-2xl font-bold flex items-center space-x-2">
            {profileData?.name} <span className="text-blue-500">✔</span>
          </h2>
          <p className="text-sm text-gray-400">
            {profileData?.following.length || 0} friends
          </p>
        </div>

        {/* Edit Profile Button */}
        <div className="pt-6">
          <button className="bg-[#971d21a5] text-white px-4 py-2 rounded">
            Edit profile
          </button>
        </div>
      </div>

      <p className="text-gray-400 ms-16 mt-9">
        {profileData?.position || "Lead Developer"} ·{" "}
        {profileData?.location || "New Hampshire"} · Joined on{" "}
        {profileData?.joinedDate || "Nov 26, 2019"}
      </p>

      {/* Navigation Tabs */}
      <div className="flex justify-around border-t rounded border-[#202227] px-6 py-3 w-full text-gray-400 mt-4">
        <Link
          href="/profile"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Feed
        </Link>
        <Link
          href="/profile/about"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          About
        </Link>
        <Link
          href="/profile/friends"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Friends
          <span className="text-[#619f33f0]">
            <button className="btn px-4 bg-[#50703753] rounded">
              {profileData?.following.length}
            </button>
          </span>
        </Link>
        <Link
          href="/profile/media"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Media
        </Link>
        <Link
          href="/videos"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Videos
        </Link>
        <Link
          href="/events"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Events
        </Link>
        <Link
          href="/activity"
          className="hover:text-blue-700 font-semibold text-[#A1A1A8]"
        >
          Activity
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
