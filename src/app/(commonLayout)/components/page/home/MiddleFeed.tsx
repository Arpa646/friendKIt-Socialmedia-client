"use client";

import React from "react";
import UploadStory from "./UploadStory";
import PostThought from "./PostThought";
import PostCard from "./PostCard";
import { useGetPostQuery } from "@/GlobalRedux/api/api";
import { Post } from "./types";
import { SkeletonLoader } from "./SkeletonLoader"; // Adjust the import path accordingly

const MiddleFeed = () => {
  const { data: posts, isLoading } = useGetPostQuery(undefined);

  // Sort posts by `createdAt` in descending order (newest first)
  const sortedPosts = posts?.data
    ?.slice()
    .sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="    p-4 space-y-4">
      <UploadStory />
      <PostThought />
 
      {isLoading ? (
        // Render a series of skeleton loaders
        <div>
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
        </div>
      ) : (
        sortedPosts &&
        sortedPosts.map((post: Post) => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
};

export default MiddleFeed;
