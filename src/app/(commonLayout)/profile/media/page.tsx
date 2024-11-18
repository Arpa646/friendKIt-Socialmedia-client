"use client";
import React from "react";
import { useGetPostByEmailQuery } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import Image from "next/image";

type ImageProp = {
  _id: string;
  url: string;
};

type Post = {
  images: ImageProp[];
};

const Media = () => {
  const { email } = useUser();
  const { data: profileItem, isLoading } = useGetPostByEmailQuery(email);

  const posts = profileItem?.data;

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading user profile.</div>;

  // Reverse the array directly to get the posts in reverse order
  const reversedPosts = posts?.slice().reverse();

  // Flatten images from all posts
  const images = reversedPosts?.flatMap((post: Post) => post.images || []);

  return (
    <div className="flex flex-col bg-background text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Photos</h1>
      </div>

      {images && images.length > 0 ? (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image: ImageProp, index: number) => (
            <div key={image._id || index} className="relative w-full h-40">
              <Image
                src={image.url || "/default-image.jpg"} // Use a default image if no URL
                alt="Media Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No media available yet. Upload your first image!</p>
        </div>
      )}
    </div>
  );
};

export default Media;
