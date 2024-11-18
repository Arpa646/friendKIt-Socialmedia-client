// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { PulseLoader } from "react-spinners"; // Loader package
// import {
//   useGetSingleRecipeQuery,
//   useAddRatingMutation,
//   useAddCommentMutation,
//   useFollowRequestMutation,
//   useCancelCommentMutation,
// } from "@/GlobalRedux/api/api"; // Adjust to your API slice
// import { jwtDecode } from "jwt-decode";
// import { RootState } from "@/GlobalRedux/store";
// import { useSelector } from "react-redux";
// import { FaStar } from "react-icons/fa"; // Star icons for rating
// import { useState, useEffect } from "react";
// import { AiOutlineUser } from "react-icons/ai"; // User icon
// import Image from "next/image";
// interface CustomJwtPayload {
//   role?: string;
//   userId?: string;
//   useremail?: string;
// }

export default function RecipeDetails() {
//   const [rating, setRating] = useState(0);
//   const [hoverRating, setHoverRating] = useState(0); // Hover effect for stars
//   const [comment, setComment] = useState(""); // State for comment
//   const [isFollowing, setIsFollowing] = useState(false); // Track follow status

//   const token = useSelector((state: RootState) => state.auth.token);
//   const user = token ? jwtDecode<CustomJwtPayload>(token) : null;
//   const userId: string = user?.useremail || "Guest"; // Extract user ID from token

//   const id = params.recipeId;
// //{pollingInterval: 1000 }
//   const { data: recipeData, isLoading: isRecipeLoading } =
//     useGetSingleRecipeQuery(id as string,{pollingInterval: 1000 });
//   const [addRating, { isLoading: isRatingSubmitting }] = useAddRatingMutation();
//   const [addComment] = useAddCommentMutation();
//   const [followRequest] = useFollowRequestMutation();
//   const [cancelComment, { isLoading: isCommentDeleting }] =
//     useCancelCommentMutation();

//   const recipe = recipeData?.data;
//   const userdata = recipe?.user;
// const recipeId=recipe?._id
// console.log(recipeId)
//   useEffect(() => {
//     if (userdata?.followers) {
//       setIsFollowing(userdata.followers.includes(userId));
//     }
//   }, [userdata, userId]);

  // Handle rating click
  // const handleRatingClick = async (rate: number) => {
  //   setRating(rate);
  //   const ratingData = { recipeId: id, userId, rating: rate };
  //   try {
  //     await addRating(ratingData).unwrap();
  //     console.log("Rating submitted successfully");
  //   } catch (error) {
  //     console.error("Failed to submit rating:", error);
  //   }
  // };

  // // Handle comment submission
  // const handleCommentSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const commentData = { recipeId: id, userId, comment };
  //   try {
  //     await addComment(commentData).unwrap();
  //     setComment(""); // Clear the input field
  //     console.log("Comment submitted successfully");
  //   } catch (error) {
  //     console.error("Failed to submit comment:", error);
  //   }
  // };

  // Handle comment deletion
  // const handleDeleteComment = async (id: string) => {
  //   try {
  //     // Sending the recipeId as part of the body
  //     await cancelComment({ id, recipeId:recipe?._id }).unwrap();
  //     console.log("Comment deleted successfully");
  //   } catch (error) {
  //     console.error("Failed to delete comment:", error);
  //   }
  // };
  
  // Handle follow request
  // const handleFollow = async () => {
  //   try {
  //     await followRequest({
  //       currentUserId: userId,
  //       targetUserId: userdata._id,
  //     });
  //     setIsFollowing(true);
  //     console.log("Follow request successful");
  //   } catch (error) {
  //     console.error("Failed to follow user:", error);
  //   }
  // };

  // if (isRecipeLoading || isRatingSubmitting) {
  //   return (
  //     <div className="flex justify-center items-center h-screen bg-black">
  //       <PulseLoader color="#A18549" size={15} />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center p-4 text-black min-h-screen">
    
    </div>
  );
}


