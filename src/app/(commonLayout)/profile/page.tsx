"use client";

import React from "react";
import PostThought from "./PostThought";
import PostCard from "./PostCard";
import { useGetPostByEmailQuery } from "@/GlobalRedux/api/api";
import { useUser } from "./services";
import { Post } from "./types"; // Adjust the import path accordingly
import { SkeletonLoader } from "../components/page/home/SkeletonLoader"; 
const MyPost = () => {
  const { email } = useUser();
  const { data: response, isLoading } = useGetPostByEmailQuery(email);

  console.log("email,posts", response);
  console.log(email);

  if (isLoading) return <div><SkeletonLoader/></div>;

  // if (error) {
  //   return (
  //     <p className="text-center text-gray-500">
  //       We're unable to load your posts at the moment. Please try again later.
  //     </p>
  //   );
  // }

  // Check if the response is successful and has data
  const { success, data: posts } = response || {};
  const sortedPosts =
    posts?.slice().sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="p-4">
      <PostThought />

      {success && sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((post: Post) => (
          <PostCard key={post._id as string} post={post} />
        ))
      ) : (
        <p className="text-center text-gray-500">You haven’t posted anything yet. Share your first thought!</p>
      )}
    </div>
  );
};

export default MyPost;
