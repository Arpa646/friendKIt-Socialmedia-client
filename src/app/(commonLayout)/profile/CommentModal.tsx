// CommentModal.tsx

import React, { useState } from "react";
import { useAddCommentMutation } from "@/GlobalRedux/api/api";
import { IoSend } from "react-icons/io5";
import { Post,  Comment, Image } from "./types"; // Adjust the import path accordingly

interface CommentModalProps {
  post: Post;
  onClose: () => void;
  userId: string;
}

const CommentModal: React.FC<CommentModalProps> = ({ post, onClose, userId }) => {
  const [comment, setComment] = useState("");
  const [addComment] = useAddCommentMutation();

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commentData = { postId: post._id, userId, comment };
    try {
      await addComment(commentData).unwrap();
      setComment(""); // Clear the input field
      console.log("Comment submitted successfully");
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-[#252728] text-black p-6 rounded-lg max-w-2xl w-full h-screen">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          Close
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto h-[calc(100vh-200px)] pb-24">
          {/* Post Header */}
          <div className="post-header flex items-center text-white">
            <img
              src={post.userId?.image || "/default-avatar.png"}
              alt={post.userId?.name || "User"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="ml-4">
              <h4 className="font-bold">{post.userId?.name || "Unknown User"}</h4>
              <p className="text-sm text-gray-400">
                {post.userId?.position || "Unknown Position"} -{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <p className="mt-4 text-white">{post.content}</p>

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
                  key={image._id}
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
          <div className="actions mt-4 flex justify-between items-center text-gray-400 text-sm">
            <div className="flex gap-2 items-center">
              <span className="text-red-600">
                {post.likedBy?.length || 0} Love
              </span>
            </div>
            <div className="flex gap-2 items-center text-white">
              <span>{post.comments ? post.comments.length : 0} Comments</span>
            </div>
          </div>

          {/* Comments Section */}
          <div className="comments-section mt-6">
            <h3 className="text-lg font-semibold text-white">Comments</h3>
            <div className="mt-4 space-y-4">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment: Comment) => (
                  <div
                    key={comment._id}
                    className="p-1 flex gap-2 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <img
                        src={
                          comment.user?.profileImage ||
                          "/default-avatar.png"
                        }
                        alt={comment.user?.name || "User"}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="text-gray-300 text-white bg-[#333334] p-2 rounded inline-block">
                      <span className="text-white font-sans text-xs">
                        {comment.user?.name || "Anonymous"}
                      </span>
                      <div className="font-sans text-sm">{comment.comment}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No comments yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Comment Input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#252728] border-t border-gray-600">
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-2">
            <textarea
              className="w-full rounded-lg text-white p-4 bg-[#333334]"
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Comment as Arpa Tasnim.."
              required
            />
            <button
              type="submit"
              className="self-end text-white rounded-lg hover:bg-blue-600 relative"
            >
              <IoSend size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
