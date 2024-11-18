"use client";
import React from "react"; // Add this import
import Link from "next/link";
import { AiOutlineEye, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import {
  useLikeRecipeMutation,
  useDislikeRecipeMutation,
  useGetSingleUserQuery,
} from "@/GlobalRedux/api/api";
import { useUser } from "@/services";
import { toast } from "react-toastify"; // Toast notification library
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Image from "next/image";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Next.js router for navigation

interface ObjectId {
  _id: string;
}

interface Comment {
  userId: ObjectId;
  comment: string;
  _id: ObjectId;
}

interface User {
  _id: string;
  name: string;
}
interface Rating {
  userId: ObjectId;
  rating: number;
  _id: ObjectId;
}

interface Recipe {
  _id: ObjectId;
  title: string;
  time: string;
  image: string;
  recipe: string;
  user: User;
  isDeleted: boolean;
  isPublished: boolean;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  rating: number;
  ratings: Rating[];
  dislikedBy: string[];
  likedBy: string[];
}

interface RecipeCardProps {
  Recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ Recipe }) => {
  const { userId } = useUser(); // Get the current user's ID
  const { data: userData } = useGetSingleUserQuery(userId); // Fetch the current user's data
  const [likeRecipe] = useLikeRecipeMutation();
  const [dislikeRecipe] = useDislikeRecipeMutation();
const router =useRouter()
  // Local state to handle like/dislike counts
  const [likeCount, setLikeCount] = React.useState(Recipe?.likedBy?.length);
  const [dislikeCount, setDislikeCount] = React.useState(
    Recipe?.dislikedBy?.length
  );
  const [hasLiked, setHasLiked] = React.useState(
    Recipe.likedBy.includes(userId)
  );
  const [hasDisliked, setHasDisliked] = React.useState(
    Recipe.dislikedBy.includes(userId)
  );

  const getRecipePreview = (html: string, maxLength: number): string => {
    let currentLength = 0;
    let result = "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const traverseNodes = (node: Node): void => {
      if (currentLength >= maxLength) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent || "";
        const remainingLength = maxLength - currentLength;

        if (textContent.length > remainingLength) {
          result += textContent.slice(0, remainingLength) + "...";
          currentLength = maxLength;
        } else {
          result += textContent;
          currentLength += textContent.length;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        result += `<${(node as Element).nodeName.toLowerCase()}>`;
        Array.from(node.childNodes).forEach(traverseNodes);
        result += `</${(node as Element).nodeName.toLowerCase()}>`;
      }
    };

    Array.from(tempDiv.childNodes).forEach(traverseNodes);
    return result;
  };

  const recipePreview = getRecipePreview(Recipe.recipe, 100);

  const handleLike = async () => {
    const info = { recipeId: Recipe._id, userId };

    try {
      if (hasLiked) {
        // If already liked, undo like
        await dislikeRecipe(info); // Assuming same API can be used for undoing like
        setHasLiked(false);
        setLikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease like count
      } else {
        // Like the recipe
        await likeRecipe(info);
        setHasLiked(true);
        setLikeCount((prevCount) => prevCount + 1); // Increase like count

        if (hasDisliked) {
          // If previously disliked, undo dislike
          setHasDisliked(false);
          setDislikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease dislike count
        }
      }
    } catch (error) {
      console.error("Failed to like/dislike the recipe:", error);
    }
  };
  const handleDislike = async () => {
    const info = { recipeId: Recipe._id, userId };

    try {
      if (hasDisliked) {
        // If already disliked, undo dislike
        await likeRecipe(info); // Assuming same API can be used for undoing dislike
        setHasDisliked(false);
        setDislikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease dislike count
      } else {
        // Dislike the recipe
        await dislikeRecipe(info);
        setHasDisliked(true);
        setDislikeCount((prevCount) => prevCount + 1); // Increase dislike count

        if (hasLiked) {
          // If previously liked, undo like
          setHasLiked(false);
          setLikeCount((prevCount) => Math.max(prevCount - 1, 0)); // Decrease like count
        }
      }
    } catch (error) {
      console.error("Failed to dislike the recipe:", error);
    }
  };
  const handleViewDetails = () => {
    console.log("prem", userData?.data?.isPremium);

    if (userData?.data?.isPremium) {
      // Navigate to the recipe details if the user is premium
      window.location.href = `/${Recipe._id}`;
    } else {
      // Show SweetAlert2 modal for non-premium users
      Swal.fire({
        title: "You are not a premium user!",
        text: "Want to become a premium member to view exclusive recipes?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Become Premium",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the premium membership page
          router.push("/dashboard/getpremiumuser");
        } else if (result.isDismissed) {
          toast.error("Only premium users can view details!");
        }
      });
    }
  };

  return (
    <div className="Recipe-card border flex flex-col md:flex-row justify-center items-center border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="Recipe-image w-full md:w-2/4">
        <Image
          src={Recipe?.image || "/path/to/fallback-image.jpg"}
          alt={Recipe?.title || "Recipe image"}
          className="w-full p-2 h-48 md:h-48 object-cover rounded-l-lg md:rounded-none"
          width={500}
          height={300}
        />
      </div>

      <div className="p-4 w-full md:w-1/2">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {Recipe.title}
        </h3>
        <div
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: recipePreview }}
        ></div>
        <div className="mb-2">
          <span className="font-bold text-gray-700">
            {Recipe?.comments?.length || 0}
          </span>{" "}
          comments
        </div>
        <div className="flex gap-3 mt-6">
          <b>{likeCount}</b>
          <button
            onClick={handleLike}
            className={`${hasLiked ? "text-blue-500" : "text-gray-500"}`}
          >
            <AiOutlineLike size={25} />
          </button>

          <b className="ms-4">{dislikeCount}</b>
          <button
            onClick={handleDislike}
            className={` ${hasDisliked ? "text-blue-500" : "text-gray-500"}`}
          >
            <AiOutlineDislike size={25} />
          </button>
        </div>
      </div>

      <div className="h-full border-t md:border-t-0 md:border-l p-4 w-full md:w-1/3 flex flex-col justify-between items-center">
        <div className="mb-4 text-center">
          <span className="font-semibold text-gray-700 text-lg">
            {Recipe.time} Min
          </span>
          <br />
          <span className="text-sm text-gray-500">For Cooking</span>
        </div>
        <div>
          <Link href={`/userprofile/${Recipe.user?._id}`}>
            By: <b>{Recipe.user?.name} {`-->`}</b>
          </Link>
        </div>
        <div className="space-x-2">
          <button
            onClick={handleViewDetails}
            className="border relative px-3 py-2 border-[#A18549]"
          >
            <AiOutlineEye />
            <span className="-top-5 text-black left-1 absolute opacity-0 hover:opacity-100 transition-opacity duration-300">
              Details
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
