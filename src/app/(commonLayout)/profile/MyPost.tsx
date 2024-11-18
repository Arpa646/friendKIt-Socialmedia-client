// "use client";

// import React from "react";

// import PostThought from "@/app/components/page/home/PostThought";
// import PostCard from "@/app/components/page/home/PostCard";
// import { useGetPostQuery } from "@/GlobalRedux/api/api";



const MyPost = () => {
  // const { data: posts, error, isLoading } = useGetPostQuery();
  // // const [likeRecipe] = useLikePostMutation();

  // if (isLoading) return <p>Loading posts...</p>;
  // if (error) return <p>Error loading posts: {error.message}</p>;

  // // Sort posts by `createdAt` in descending order (newest first)
  // const sortedPosts = posts?.data
  //   ?.slice()
  //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    // <div className="w-1/2 p-4">
  
    //   <PostThought />

    //   {sortedPosts &&
    //     sortedPosts.map((post) => <PostCard key={post.id} post={post} />)}
    // </div>

    <h1>hi</h1>
  );
};

export default MyPost;
