import React, { useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import { useLikePostMutation } from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import CommentModal from "./CommentModal";
import { Post, Image } from "./types";

interface CardModalProps {
  post: Post;
}

const PostCard: React.FC<CardModalProps> = ({ post }) => {
  const [likePost] = useLikePostMutation(); // Mutation to post a like
  const { userId } = useUser();

  const [hasLiked, setHasLiked] = useState(post?.likedBy?.includes(userId)); // Tracks if user has liked the post
  const [likesCount, setLikesCount] = useState(post.likedBy ? post.likedBy.length : 0);

  const handleLike = async () => {
    try {
      // Optimistically update state
      if (hasLiked) {
        setHasLiked(false);
        setLikesCount((prev) => prev - 1);
      } else {
        setHasLiked(true);
        setLikesCount((prev) => prev + 1);
      }

      // Trigger mutation
      await likePost({
        postId: post._id,
        userId,
      });
    } catch (error) {
      console.error("Error toggling like:", error);

      // Revert optimistic update if mutation fails
      setHasLiked((prev) => !prev);
      setLikesCount((prev) => (hasLiked ? prev + 1 : prev - 1));
    }
  };

  const formatTimeAgo = (createdAt: string | Date) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="post bg-background text-white p-4 rounded mb-4">
      {/* Post Header Section */}
      <div className="post-header flex items-center">
        <img
          src={post?.userId?.image || "/default-avatar.png"}
          alt={ "User"}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-bold">{post?.userId?.name || "Unknown User"}</h4>
          <p className="text-sm text-gray-400">
            {post?.location || "Unknown Position"} -{" "}
            {post?.createdAt ? formatTimeAgo(post.createdAt) : "Unknown Time"}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-4">{post.content}</p>

      {/* Dynamically Display Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={`grid gap-2 mt-4 ${
            post.images.length === 1
              ? "grid-cols-1"
              : post.images.length === 2
              ? "grid-cols-2"
              : post.images.length === 3
              ? "grid-cols-3"
              : "grid-cols-2"
          }`}
        >
          {post.images.map((image: Image, index: number) => (
            <div
              key={index}
              className="relative w-full h-0 pb-[100%] overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={`Post Image ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="actions mt-4 gap-2 p-3 flex justify-between items-center text-gray-400 text-sm">
        <div className="flex gap-2 items-center">
          <FaHeart
            onClick={handleLike}
            style={{
              color: hasLiked ? "red" : "transparent",
              stroke: "red",
              strokeWidth: 20,
            }}
            size={20}
          />
          <span className="text-red-600">{likesCount} Love</span>
        </div>
        <div className="flex gap-2 items-center" onClick={openModal}>
          <FaComment size={20} color="#4F5C6E" />
          <span>{post?.comments ? post.comments.length : 0} Comments</span>
        </div>
      </div>

      {isModalOpen && <CommentModal post={post} userId={userId} onClose={closeModal} />}
    </div>
  );
};

export default PostCard;
